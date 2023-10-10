"use client";
import { Button, TextField, Box } from "@mui/material";
import { AdminSignInFormProps } from "@/app/general/interfaces";

function SigninForm({
    handleSubmit = () => null,
    passwordHandler = () => null,
    emailHandler = () => null,
}: AdminSignInFormProps) {
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "20%", margin: "auto" }}
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
                sx={{ mt: 3, mb: 2, mr: 20, width: "20%" }}
            >
                התחבר
            </Button>
        </Box>
    );
}

export default SigninForm;
