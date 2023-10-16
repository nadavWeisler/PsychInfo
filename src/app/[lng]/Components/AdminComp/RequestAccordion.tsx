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
    data,
    deleteHandler,
}: RequestAccordionProps) {
    const { t } = useTrans();

    async function deleteRequest(): Promise<void> {
        await deletePendingContent(data.title);
        deleteHandler();
    }

    async function aproveRequest(): Promise<void> {
        const content: Content = {
            ...data
        };
        await createContent(content);
        deletePendingContent(data.title);
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
                    <Typography>{data.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AccordionContent
                        data={data}
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
