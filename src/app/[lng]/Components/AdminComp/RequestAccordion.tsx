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
import { RequestAccordionProps } from "@/app/[lng]/general/interfaces";
import AccordionContent from "@/app/[lng]/Components/ResultComp/AccordionContent";
import {
    deletePendingContent,
    createContent,
} from "@/app/[lng]/firebase/commands";
import { useTranslation } from "react-i18next";

function RequestAccordion({
    title = "",
    link = "",
    tags = [],
    organization = { id: "", display: "", used: false, languageId: "" },
    description = "",
    languageId = "",
    uploader = "",
    id = "",
    deleteHandler = () => null,
}: RequestAccordionProps) {
    const deleteRequest = async () => {
        deletePendingContent(title);
        deleteHandler();
    };
    const aproveRequest = async () => {
        const content = {
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
    };
    const { t } = useTranslation();
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
export default RequestAccordion;
