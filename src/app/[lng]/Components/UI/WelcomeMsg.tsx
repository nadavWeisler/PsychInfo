"use client";
import { Typography, Button, Box, Container } from "@mui/material";
import { WelcomeMsgProps } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { useRouter } from "next/navigation";

export default function WelcomeMsg({
    lng,
    openWizradHandler,
}: WelcomeMsgProps): React.ReactElement {
    const { t, i18n, direction } = useTrans();
    const router = useRouter();
    const therapistHandler = () => {
        router.replace(`/${i18n.language}/register-therapist`);
    };

    return (    
        <Box margin={"20px"}>
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
            <Container
                maxWidth={"sm"}
                sx={{
                    textAlign: "center",
                    marginTop: "50px",
                }}
            >
                <Button
                    sx={{
                        fontSize: "20px",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={therapistHandler}
                >
                    {t("welcome.therapist")}
                </Button>
            </Container>
        </Box>
    );
}
