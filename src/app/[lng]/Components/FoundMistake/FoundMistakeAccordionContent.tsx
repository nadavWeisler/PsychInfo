import { Typography, Box, Chip } from "@mui/material";

function FoundMistakeAccordionContent({
    name = "",
    email = "",
    description = "",
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
            }}
        >
            <Typography sx={{ margin: "10px" }} variant="h6">
                שם המדווח: {name}
            </Typography>
            <Typography sx={{ margin: "10px" }} variant="h6">
                אימייל המדווח: {email}
            </Typography>
            <Typography sx={{ margin: "10px" }} variant="h6">
                תיאור הבעיה: {description}
            </Typography>
        </Box>
    );
}

export default FoundMistakeAccordionContent;
