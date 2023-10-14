import { Typography, Box } from "@mui/material";
import { FoundMistakeAccordionContentProps } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function FoundMistakeAccordionContent({
    name,
    emailToContact,
    description,
}: FoundMistakeAccordionContentProps) {
    const { t } = useTrans();

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
}
