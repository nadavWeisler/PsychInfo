"use client";
import { useState } from "react";
import { Box, Snackbar } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import UploadTexts from "@/app/[lng]/Components/UploadTexts";
import UploadForm from "@/app/[lng]/Components/UploadForm";
import { styles } from "@/app/[lng]/upload/page.style";
import CloseButton from "@/app/[lng]/Components/CloseButton";

export default function UploadContent() {
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const { t } = useTrans();

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setIsSubmit(false);
    };

    return (
        <Box sx={styles.root}>
            <UploadTexts />
            <UploadForm
                isSubmitHandler={(value: boolean) => setIsSubmit(value)}
            />
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={isSubmit}
                onClose={handleClose}
                message={t(LocalizationKeys.Upload.SubmitSuccess)}
                autoHideDuration={6000}
                action={<CloseButton handleClose={handleClose} />}
            />
        </Box>
    );
}
