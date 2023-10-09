"use client";
import { Typography, Button, Box, ThemeProvider } from "@mui/material";
import { WelcomeMsgProps } from "@/app/General/interfaces";
import { darkTheme } from "@/app/General/styles";

function WelcomeMsg({ openWizradHandler = () => null }: WelcomeMsgProps) {
    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                sx={{
                    margin: "auto",
                    textAlign: "center",
                    marginTop: "75px",
                }}
            >
                <Typography variant="h1" component="div" gutterBottom>
                    Welcome to PsychInfo!
                </Typography>
                <Typography variant="h4" component="div" gutterBottom>
                    Click the button below to get started.
                </Typography>
                <Button
                    sx={{
                        marginTop: "20px",
                        width: "100px",
                        height: "50px",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={openWizradHandler}
                >
                    Start
                </Button>
            </Box>
        </ThemeProvider>
    );
}

export default WelcomeMsg;
