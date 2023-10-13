"use client";
import { useState } from "react";
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
import { useTranslation } from "react-i18next";

function ResultAccordion({ title, link, tags, organization, description, languageId, uploader }: Content) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

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
                </AccordionActions>
            </Accordion>
            <ShareDialog
                open={open}
                onClose={() => setOpen(false)}
                urlToShare={link}
            />
        </Box>

    );
}

export default ResultAccordion;
