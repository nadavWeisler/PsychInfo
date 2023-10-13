import { Typography, Box } from "@mui/material";
import { FoundMistakeAccordionContentProps } from "../../general/interfaces";
import { useParams } from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";

export default function FoundMistakeAccordionContent({ name, emailToContact, description }:
    FoundMistakeAccordionContentProps) {

    const locale = useParams()?.locale as LocaleTypes;
    const { t } = useTranslation(locale, "translation");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
            }}
        >
            <Typography sx={{ margin: "10px" }} variant="h6">
                {t("common.name")}: {name}
            </Typography>
            <Typography sx={{ margin: "10px" }} variant="h6">
                {t("common.email")}: {emailToContact}
            </Typography>
            <Typography sx={{ margin: "10px" }} variant="h6">
                {t("common.description")}: {description}
            </Typography>
        </Box>
    );
};