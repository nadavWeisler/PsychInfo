"use client";
import { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import { AdminSignInFormProps } from "@/app/general/interfaces";
import { useWindowWidth } from "@/app/hooks/useWidth";

function SigninForm({
    handleSubmit = () => null,
    passwordHandler = () => null,
    emailHandler = () => null,
}: AdminSignInFormProps) {
    const width = useWindowWidth();
    const [isMobile, setIsMobile] = useState<Boolean>(width <= 768);
    useEffect(() => {
        setIsMobile(width <= 768);
    }, [width]);

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
