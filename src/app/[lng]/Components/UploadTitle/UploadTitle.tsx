import CSSTextField from "@/app/[lng]/Components/CSSTextField";
import { FormControl, FormLabel } from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function UploadTitle() {
    const { t } = useTrans();
    return (
        <FormControl
            required
            key={LocalizationKeys.Common.Title}
            fullWidth
            margin="normal"
        >
            <FormLabel>{t(LocalizationKeys.Common.Title)}</FormLabel>
            <CSSTextField required id="title" name="title" autoFocus />
        </FormControl>
    );
}
