import { Typography, Box } from "@mui/material";
import { Content, Language } from "@/app/general/interfaces";

function AccordionContent({
    title = "",
    link = "",
    tags = [],
    organization = [],
    description = "",
    language = Language.Hebrew,
}: Content) {
    const tagsArr = tags.map((tag) => tag.display);
    const organizationsArr = organization.map(
        (organization) => organization.display
    );

    const organizationString = organizationsArr.join(", ");
    const tagsString = tagsArr.join(", ");

    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant="body1">
                ארגונים: {organizationString}
            </Typography>
            <Typography variant="body1">תגיות: {tagsString}</Typography>
            <Typography variant="h4">{description}</Typography>
        </Box>
    );
}

export default AccordionContent;
