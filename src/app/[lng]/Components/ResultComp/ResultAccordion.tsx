"use client";
import { useState, useContext, useEffect } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Link,
    Button,
    Box,
    AccordionActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Content } from "@/app/[lng]/general/interfaces";
import AccordionContent from "@/app/[lng]/Components/ResultComp/AccordionContent";
import ShareDialog from "@/app/[lng]/Components/ResultComp/ShareDialog";
import { LocaleTypes } from "@/i18n/settings";
import { useParams } from "next/navigation";
import { useTranslation } from "@/i18n/client";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { deleteContent } from "@/app/[lng]/firebase/commands";
export default function ResultAccordion({ id, title, link, tags, organization, description, languageId, uploader }: Content) {
    const locale = useParams()?.locale as LocaleTypes;
    const { t } = useTranslation(locale, "translation");
    const [open, setOpen] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!!user) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        });
    }, [user]);

    const deleteSelectedContent = () => {
        deleteContent(id);
    };

    return (
        <Box
            sx={{
                width: "60%",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Accordion sx={{ backgroundColor: "#42a5f5", margin: "auto" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AccordionContent
                        title={title}
                        link={link}
                        tags={tags}
                        organization={organization}
                        description={description}
                        languageId={languageId}
                        uploader={uploader}
                        id={id}
                    />
                    <Link
                        margin={"normal"}
                        href={link}
                        target="_blank"
                        rel="noopener"
                    >
                        {title}
                    </Link>
                </AccordionDetails>
                <AccordionActions>
                    <Button
                        sx={{ margin: "auto" }}
                        color={"success"}
                        variant={"contained"}
                        onClick={() => setOpen(true)}
                    >
                        {t("common.share")}
                    </Button>
                    {isAdmin && (
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <Button
                                sx={{ margin: "auto" }}
                                color={"error"}
                                variant={"outlined"}
                                onClick={deleteSelectedContent}
                            >
                                {t("common.delete")}
                            </Button>
                        </Box>
                    )}
                </AccordionActions>
            </Accordion>
            <ShareDialog
                open={open}
                onClose={() => setOpen(false)}
                urlToShare={link}
            />
        </Box>
    );
};
