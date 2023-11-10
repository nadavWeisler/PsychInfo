"use client";
import { Typography, Button, Box, Container } from "@mui/material";
import { WelcomeMsgProps } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/UI/WelcomeMsg.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

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
                {t(LocalizationKeys.Welcome.Title)}
            </Typography>
            <Typography
                dir={direction}
                margin={"normal"}
                color={"black"}
                variant="h6"
                component="div"
                textAlign={"center"}
                gutterBottom
            >
                <i>
                    {`${t(LocalizationKeys.Welcome.Start1)}`}
                    <br />
                    {`${t(LocalizationKeys.Welcome.Start2)}`}
                    <br />
                    {`${t(LocalizationKeys.Welcome.Start3)}`}
                </i>
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
                {`${t(LocalizationKeys.Welcome.Main1)}`}
                <br />
                {`${t(LocalizationKeys.Welcome.Main2)}`}
                <br />
                <br />
                {`${t(LocalizationKeys.Welcome.End1)}`}
                <br />
                {`${t(LocalizationKeys.Welcome.End2)}`}
            </Typography>
            <Box sx={styles.box}>
                <Button
                    sx={styles.button}
                    variant="contained"
                    color="primary"
                    onClick={openWizradHandler}
                >
                    {t(LocalizationKeys.Common.Start)}
                </Button>
            </Box>
            <Container maxWidth={"sm"} sx={styles.container}></Container>
        </Box>
    );
}
