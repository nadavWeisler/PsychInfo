import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { styles } from "@/app/[lng]/Components/EmergencyButton/EmergencyButton.style";

export default function EmergencyButton() {
    const { t, i18n } = useTrans();
    const router = useRouter();
    return (
        <Button
            variant="contained"
            color="error"
            sx={styles.button}
            onClick={() => router.replace(`/${i18n.language}/emergency-view`)}
        >
            {t(LocalizationKeys.EnergencyView.Title)}
        </Button>
    );
}
