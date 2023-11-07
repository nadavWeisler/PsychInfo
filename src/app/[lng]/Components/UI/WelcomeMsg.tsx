"use client";
import { Typography, Button, Box, Container } from "@mui/material";
import { WelcomeMsgProps } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/UI/WelcomeMsg.style";

export default function WelcomeMsg({
    openWizradHandler,
}: WelcomeMsgProps): React.ReactElement {
    const { t, direction } = useTrans();

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
                textAlign={"justify"}
                gutterBottom
            >
                {`${t("welcome.subtitle1")}`}
                <br />
                {t("welcome.list1")}
                <br />
                {t("welcome.list2")}
                <br />
                {t("welcome.subtitle2")}
            </Typography>
            <Box sx={styles.box}>
                <Button
                    sx={styles.button}
                    variant="contained"
                    color="primary"
                    onClick={openWizradHandler}
                >
                    {t("common.start")}
                </Button>
            </Box>
            <Container maxWidth={"sm"} sx={styles.container}></Container>
        </Box>
    );
}
