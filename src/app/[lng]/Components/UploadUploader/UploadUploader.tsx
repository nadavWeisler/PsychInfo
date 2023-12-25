import { FormControl, FormLabel } from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import CSSTextField from "@/app/[lng]/Components/CSSTextField";

export default function UploadUploader() {
    const { t } = useTrans();
    return (
        <FormControl
            key={LocalizationKeys.Common.Uploader}
            margin="normal"
            fullWidth
            required
        >
            <FormLabel>{t(LocalizationKeys.Common.Uploader)}</FormLabel>
            <CSSTextField name="uploader" id="uploader" />
        </FormControl>
    );
}
