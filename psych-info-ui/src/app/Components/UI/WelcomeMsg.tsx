"use client";
import { Typography, Button, Box } from "@mui/material";
import { WelcomeMsgProps } from "@/app/general/interfaces";
import { useTranslation } from "react-i18next";

function WelcomeMsg({ openWizradHandler = () => null }: WelcomeMsgProps) {
    const { t } = useTranslation();
    return (
        <Box margin={"20px"}>
            <Typography
                margin={"normal"}
                color={"black"}
                variant="h4"
                component="div"
                gutterBottom
                textAlign={"center"}
            >
                {t("welcome.title")}
            </Typography>
            <Typography
                margin={"normal"}
                color={"black"}
                variant="h6"
                component="div"
                gutterBottom
            >
                {t("welcome.subtitle1")}
            </Typography>
            <Typography
                margin={"normal"}
                color={"black"}
                variant="h6"
                component="div"
                gutterBottom
            >
                {t("welcome.list1")}
            </Typography>
            <Typography
                margin={"normal"}
                color={"black"}
                variant="h6"
                component="div"
                gutterBottom
            >
                {t("welcome.list2")}
            </Typography>
            <Typography
                margin={"normal"}
                color={"black"}
                variant="h6"
                component="div"
                gutterBottom
            >
                {t("welcome.subtitle2")}
            </Typography>
            <Box
                sx={{
                    textAlign: "center",
                    marginTop: "20px",
                }}

            ><Button
                sx={{
                    width: "100px",
                    height: "50px",
                    fontSize: "20px"
                }}
                variant="contained"
                color="primary"
                onClick={openWizradHandler}
            >
                    {t("common.start")}
                </Button>
            </Box>
        </Box>
    );
}

export default WelcomeMsg;
