import { Typography, Box, Button } from "@mui/material";
import { FoundMistakeAccordionContentProps } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { deletePendingMistake } from "@/app/[lng]/firebase/commands";
import { styles } from "@/app/[lng]/Components/FoundMistake/FoundMistakeAccordionContent.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

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
        <Box dir={btnDirrection} sx={styles.root}>
            <Typography dir={direction} sx={styles.typ} variant="h6">
                {t(LocalizationKeys.Common.Name)}: {data.name}
            </Typography>
            <Typography dir={direction} sx={styles.typ} variant="h6">
                {t(LocalizationKeys.Common.Email)}: {data.emailToContact}
            </Typography>
            <Typography dir={direction} sx={styles.typ} variant="h6">
                {t(LocalizationKeys.Common.Description)}: {data.description}
            </Typography>

            <Box sx={styles.box}>
                <Button
                    sx={styles.button}
                    color={"error"}
                    variant={"outlined"}
                    onClick={deleteMistake}
                >
                    {t(LocalizationKeys.Common.Delete)}
                </Button>
            </Box>
        </Box>
    );
}
