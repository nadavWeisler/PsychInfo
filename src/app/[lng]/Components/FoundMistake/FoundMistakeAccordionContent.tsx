import { Typography, Box, Button } from "@mui/material";
import { FoundMistakeAccordionContentProps } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { deletePendingMistake } from "@/app/[lng]/firebase/commands";

export default function FoundMistakeAccordionContent({
    deleteHandler,
    data,
}: FoundMistakeAccordionContentProps) {
    const { t, direction } = useTrans();

    async function deleteMistake(): Promise<void> {
        await deletePendingMistake(data.id);
        deleteHandler();
    }

    const btnDirrection = direction === "rtl" ? "ltr" : "rtl";

    return (
        <Box
        dir={btnDirrection}
            sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
            }}
        >
            <Typography dir={direction} sx={{ margin: "10px" }} variant="h6">
                {t("common.name")}: {data.name}
            </Typography>
            <Typography dir={direction} sx={{ margin: "10px" }} variant="h6">
                {t("common.email")}: {data.emailToContact}
            </Typography>
            <Typography dir={direction} sx={{ margin: "10px" }} variant="h6">
                {t("common.description")}: {data.description}
            </Typography>

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
        </Box>
    );
}
