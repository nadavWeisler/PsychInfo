import { Typography, Box } from "@mui/material";
import { Content } from "@/app/general/interfaces";

function AccordionContent({
    title = "",
    link = "",
    tags = [],
    organization = { id: "", display: "", used: false },
    description = "",
    language = { id: "", display: "", used: false },
}: Content) {
    const tagsArr = tags.map((tag) => tag.display);
    const tagsString = tagsArr.join(", ");

    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant="body1">
                ארגונים: {organization.display}
            </Typography>
            <Typography variant="body1">תגיות: {tagsString}</Typography>
            <Typography variant="h4">{description}</Typography>
        </Box>
    );
}

export default AccordionContent;
