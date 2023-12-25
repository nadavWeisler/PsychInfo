import { ChangeEvent } from "react";
import { UploadFileProps } from "@/app/[lng]/general/interfaces";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { FormControl, FormLabel, Input } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function UploadFile({ fileHandler }: UploadFileProps) {
    const { t } = useTrans();
    return (
        <FormControl
            key={LocalizationKeys.Common.Tags}
            fullWidth
            margin="normal"
        >
            <FormLabel>{t(LocalizationKeys.Upload.Image)}</FormLabel>
            <Input
                id="file"
                name="file"
                type="file"
                inputProps={{
                    accept: "image/*",
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                        fileHandler(e.target.files?.[0]);
                    }
                }}
            />
        </FormControl>
    );
}
