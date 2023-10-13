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
import { useParams } from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";
import {
    FoundMistakeAccordionProps,
    FoundMistakeDB,
} from "@/app/[lng]/general/interfaces";
import {
    deletePendingMistake,
    getMistakes,
} from "@/app/[lng]/firebase/commands";

function FoundMistakeAccordion({
    name = "",
    emailToContact = "",
    description = "",
    id = "",
    deleteHandler = () => null,
}: FoundMistakeAccordionProps) {
    const { lng } = useParams();
    const { t, i18n } = useTranslation(lng as LocaleTypes, "translation");

    const deleteMistake = async () => {
        // const mistakes = await getMistakes();
        // const mistake = mistakes.find(
        //     (mistake) => mistake.id === id
        // ) as FoundMistakeDB;
        await deletePendingMistake(id);
        deleteHandler();
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
            <Accordion sx={{ backgroundColor: "#42a5f5" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{`טעות מדווחת ${id}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FoundMistakeAccordionContent
                        name={name}
                        email={emailToContact}
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

export default FoundMistakeAccordion;
