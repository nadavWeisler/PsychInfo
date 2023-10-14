"use client";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Box,
    Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Content, RequestAccordionProps } from "@/app/[lng]/general/interfaces";
import AccordionContent from "@/app/[lng]/Components/ResultComp/AccordionContent";
import {
    deletePendingContent,
    createContent,
} from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function RequestAccordion({
    id,
    title,
    link,
    tags,
    organization,
    description,
    languageId,
    uploader,
    deleteHandler,
}: RequestAccordionProps) {
    const { t } = useTrans();

    async function deleteRequest(): Promise<void> {
        await deletePendingContent(title);
        deleteHandler();
    }

    async function aproveRequest(): Promise<void> {
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
        await createContent(content);
        deletePendingContent(title);
        deleteHandler();
    }

    return (
        <Box
            sx={{
                width: "60%",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Accordion sx={{ backgroundColor: "#42a5f5" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AccordionContent
                        id={id}
                        title={title}
                        link={link}
                        tags={tags}
                        organization={organization}
                        description={description}
                        languageId={languageId}
                        uploader={uploader}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Button
                            sx={{ marginLeft: "20px" }}
                            color={"error"}
                            variant={"outlined"}
                            onClick={deleteRequest}
                        >
                            {t("common.delete")}
                        </Button>
                        <Button
                            color={"success"}
                            variant={"contained"}
                            onClick={aproveRequest}
                        >
                            {t("common.submit")}
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
