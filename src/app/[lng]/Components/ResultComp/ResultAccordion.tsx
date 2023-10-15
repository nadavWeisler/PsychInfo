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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { deleteContent } from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";
import EditContentDialog from "@/app/[lng]/Components/AdminComp/EditContentDialog";

export default function ResultAccordion({
    id,
    title,
    link,
    tags,
    organization,
    description,
    languageId,
    uploader,
}: Content) {
    const [openShare, setOpenShare] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const { t } = useTrans();
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

    const content: Content = {
        title,
        link,
        tags,
        organization,
        description,
        languageId,
        uploader,
        id,
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
                        onClick={() => setOpenShare(true)}
                    >
                        {t("common.share")}
                    </Button>
                    <Box sx={{ display: "flex", direction: "row" }}>
                        {isAdmin && (
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Button
                                    sx={{ margin: "auto" }}
                                    color={"primary"}
                                    variant={"contained"}
                                    onClick={() => setOpenEdit(true)}
                                >
                                    {t("common.edit")}
                                </Button>
                            </Box>
                        )}

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
                    </Box>
                </AccordionActions>
            </Accordion>
            <ShareDialog
                open={openShare}
                onClose={() => setOpenShare(false)}
                urlToShare={link}
            />
            <EditContentDialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                prevContent={content}
            />
        </Box>
    );
}
