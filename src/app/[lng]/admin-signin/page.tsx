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
          setErrorMsg(t(LocalizationKeys.SignIn.InvalidEmail));
          break;
        case "auth/invalid-login-credentials":
          setErrorMsg(t(LocalizationKeys.SignIn.InvalidCred));
          break;
        default:
          setErrorMsg(t(LocalizationKeys.SignIn.GeneralError));
          break;
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Typography sx={styles.typ} variant="h4" align="center">
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
