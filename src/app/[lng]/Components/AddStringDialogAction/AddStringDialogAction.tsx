import { Button } from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/AddStringDialogAction/AddStringDialogAction.style";
import { AddStringDialogActionProps } from "@/app/[lng]/general/interfaces";

export default function AddStringDialogAction({
    onClose,
    handleCreate,
}: AddStringDialogActionProps) {
    const { t } = useTrans();
    return (
        <>
            <Button onClick={onClose} color="primary" sx={styles.button}>
                {t(LocalizationKeys.Common.Cancel)}
            </Button>
            <Button onClick={handleCreate} color="primary" sx={styles.button}>
                {t(LocalizationKeys.Common.Create)}
            </Button>
        </>
    );
}
