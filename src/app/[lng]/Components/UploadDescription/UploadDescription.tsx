import { FormControl, FormLabel } from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import CSSTextField from "@/app/[lng]/Components/CSSTextField";

export default function UploadDescription() {
    const { t } = useTrans();
    return (
        <FormControl
            key={LocalizationKeys.Common.Description}
            required
            fullWidth
            margin="normal"
        >
            <FormLabel>{t(LocalizationKeys.Common.Description)}</FormLabel>
            <CSSTextField
                required
                name="description"
                id="description"
                multiline
            />
        </FormControl>
    );
}
