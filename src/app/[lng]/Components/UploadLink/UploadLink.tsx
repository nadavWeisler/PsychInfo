import React from "react";
import { FormControl, FormLabel } from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import CSSTextField from "@/app/[lng]/Components/CSSTextField";

export default function UploadLink() {
    const { t } = useTrans();
    return (
        <FormControl
            key={LocalizationKeys.Common.Link}
            margin="normal"
            fullWidth
        >
            <FormLabel>{t(LocalizationKeys.Common.Link)}</FormLabel>
            <CSSTextField name="link" id="link" />
        </FormControl>
    );
}
