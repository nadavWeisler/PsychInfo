"use client";
import { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { WelcomeMsgProps } from "@/app/[lng]/general/interfaces";
import { useTranslation } from "@/i18n/client";

function WelcomeMsg({
    lng = "he",
    openWizradHandler = () => null,
}: WelcomeMsgProps) {
    const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");

    const { t, i18n } = useTranslation(lng, "translation");

    useEffect(() => {
        setDirection(i18n.dir());
    }, [i18n.language]);

    return (
        <Box margin={"20px"} >
            <Typography
                dir={direction}
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
                dir={direction}
                margin={"normal"}
                color={"black"}
                variant="h6"
                component="div"
                gutterBottom
            >
                {t("welcome.subtitle1")}
            </Typography>
            <Typography
                dir={direction}
                margin={"normal"}
                color={"black"}
                variant="h6"
                component="div"
                gutterBottom
            >
                {t("welcome.list1")}
            </Typography>
            <Typography
                dir={direction}
                margin={"normal"}
                color={"black"}
                variant="h6"
                component="div"
                gutterBottom
            >
                {t("welcome.list2")}
            </Typography>
            <Typography
                dir={direction}
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
            >
                <Button
                    sx={{
                        width: "100px",
                        height: "50px",
                        fontSize: "20px",
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
