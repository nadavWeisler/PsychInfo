"use client";
import React, { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Alert, CircularProgress, Typography, Box } from "@mui/material";
import SigninForm from "@/app/Components/AdminComp/SigninForm";
import { signIn } from "@/app/firebase/auth";

function AdminSignInPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { error } = await signIn(email, password);
            if (error) {
                throw error;
            }
            router.push("/admin");
        } catch (err: any) {
            setIsError(true);
            setErrorMsg(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <Typography
                sx={{ mt: 4 }}
                color={"black"}
                variant="h4"
                align="center"
            >
                כניסת מנהל
            </Typography>

            {isError && <Alert severity={"error"}>{errorMsg}</Alert>}
            <SigninForm
                passwordHandler={passwordHandler}
                emailHandler={emailHandler}
                handleSubmit={handleSubmit}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {isLoading && <CircularProgress />}
            </Box>
        </Fragment>
    );
}

export default AdminSignInPage;
