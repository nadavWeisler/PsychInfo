import { Typography, Box } from "@mui/material";
import { Content } from "@/app/general/interfaces";
import { useTranslation } from "react-i18next";

function AccordionContent({
    title = "",
    link = "",
    tags = [],
    organization = { id: "", display: "", used: false, languageId:"" },
    description = "",
    languageId = ""
}: Content) {
    const tagsArr = tags.map((tag) => tag.display);
    const tagsString = tagsArr.join(", ");
    const { t } = useTranslation();
    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant="body1">
                {t("common.organizations")}: {organization.display}
            </Typography>
            <Typography variant="body1">{t("common.tags")}: {tagsString}</Typography>
            <Typography variant="h4">{description}</Typography>
        </Box>
    );
}

export default AccordionContent;
