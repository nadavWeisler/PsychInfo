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
import FoundMistakeAccordionContent from "@/app/[lng]/Components/FoundMistake/FoundMistakeAccordionContent";
import { FoundMistakeAccordionProps } from "@/app/[lng]/general/interfaces";
import { deletePendingMistake } from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function FoundMistakeAccordion({
    name,
    emailToContact,
    description,
    id,
    deleteHandler,
}: FoundMistakeAccordionProps) {
    const { t } = useTrans();

    async function deleteMistake(): Promise<void> {
        await deletePendingMistake(id);
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
                    <Typography>{`${t(
                        "common.reported_mistake"
                    )}: ${id}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FoundMistakeAccordionContent
                        name={name}
                        emailToContact={emailToContact}
                        description={description}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Button
                            sx={{ marginLeft: "20px" }}
                            color={"error"}
                            variant={"outlined"}
                            onClick={deleteMistake}
                        >
                            {t("common.delete")}
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
