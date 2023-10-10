"use client";
import { Typography, Button, Box, ThemeProvider } from "@mui/material";
import { WelcomeMsgProps } from "@/app/General/interfaces";
import { darkTheme } from "@/app/General/styles";
import { useTranslation } from "react-i18next";

function WelcomeMsg({ openWizradHandler = () => null }: WelcomeMsgProps) {
    const { t } = useTranslation();
    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                sx={{
                    margin: "auto",
                    textAlign: "center",
                    marginTop: "75px",
                }}
            >
                <Typography variant="h3" component="div" gutterBottom>
                    {t("welcome.title")}
                </Typography>
                <Typography variant="h6" component="div" gutterBottom>
                    {t("welcome.subtitle")}
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
                    {t("common.start")}
                </Button>
            </Box>
        </ThemeProvider>
    );
}

export default WelcomeMsg;
