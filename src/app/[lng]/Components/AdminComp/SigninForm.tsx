"use client";
import { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import { AdminSignInFormProps } from "@/app/[lng]/general/interfaces";
import { useWindowWidth } from "@/app/[lng]/hooks/useWidth";
import { useParams } from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";

export default function SigninForm({ handleSubmit, passwordHandler, emailHandler }: AdminSignInFormProps) {
    const locale = useParams()?.locale as LocaleTypes;
    const { t } = useTranslation(locale, "translation");
    
    const width = useWindowWidth();
    const [isMobile, setIsMobile] = useState<boolean>(width <= 768);

    useEffect(() => {
        setIsMobile(width <= 768);
    }, [width]);

    const windowWidth: string = isMobile ? "60%" : "20%";
    const marginForBtn: number = isMobile ? 12 : 20;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: windowWidth, margin: "auto" }}
        >
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("common.email")}
                name="email"
                autoComplete="email"
                autoFocus
                onChange={emailHandler}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("common.password")}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={passwordHandler}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, mr: marginForBtn, width: "20%" }}
            >
                {t("admin.login")}
            </Button>
        </Box>
    );
};