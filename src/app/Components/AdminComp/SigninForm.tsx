"use client";
import { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import { AdminSignInFormProps } from "@/app/general/interfaces";

function SigninForm({
    handleSubmit = () => null,
    passwordHandler = () => null,
    emailHandler = () => null,
}: AdminSignInFormProps) {
    const [width, setWidth] = useState<number>(window ? window.innerWidth : 0);

    function handleWindowSizeChange() {
        setWidth(innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    const isMobile = width <= 768;

    const windowWidth = isMobile ? "60%" : "20%";
    const marginForBtn = isMobile ? 12 : 20;
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
                label="Email Address"
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
                label="Password"
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
                התחבר
            </Button>
        </Box>
    );
}

export default SigninForm;
