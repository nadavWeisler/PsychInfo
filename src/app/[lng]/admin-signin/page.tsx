"use client";
import React, { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Alert, CircularProgress, Typography, Box } from "@mui/material";
import SigninForm from "@/app/[lng]/Components/AdminComp/SigninForm";
import { signIn } from "@/app/[lng]/firebase/auth";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { styles } from "@/app/[lng]/admin-signin/page.style";

export default function AdminSignInPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { t, i18n } = useTrans();

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { error } = await signIn(email, password);
            if (error) {
                throw error;
            }
            router.replace(`/${i18n.language}/admin`);
        } catch (err: any) {
            setIsError(true);
            switch (err.code) {
                case "auth/invalid-email":
                    setErrorMsg(t("sign_in.invalid_email"));
                    break;
                case "auth/invalid-login-credentials":
                    setErrorMsg(t("sign_in.invalid_cred"));
                    break;
                default:
                    setErrorMsg(t("sign_in.general_error"));
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Typography
                sx={styles.typ}
                color={"black"}
                variant="h4"
                align="center"
            >
                {t(LocalizationKeys.Admin.AdminLogin)}
            </Typography>
            {isError && <Alert severity={"error"}>{errorMsg}</Alert>}
            <SigninForm
                passwordHandler={(e) => setPassword(e.target.value)}
                emailHandler={(e) => setEmail(e.target.value)}
                handleSubmit={handleSubmit}
            />
            <Box sx={styles.box}>{isLoading && <CircularProgress />}</Box>
        </>
    );
}
