"use client";
import { Typography, Container } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { styles } from "@/app/[lng]/Components/WelcomeMsg/WelcomeMsg.style";

export default function WelcomeMsg(): React.ReactElement {
    const { t, direction } = useTrans();

    return (
        <Container sx={styles.container}>
            <Typography dir={direction} variant="h4" gutterBottom>
                {t(LocalizationKeys.Welcome.Title)}
            </Typography>
            <Typography
                dir={direction}
                variant="h6"
                textAlign={"justify"}
                gutterBottom
            >
                {`${t(LocalizationKeys.Welcome.Main1)}`}
                <br />
                {`${t(LocalizationKeys.Welcome.Main2)}`}
                <br />
                <br />
                {`${t(LocalizationKeys.Welcome.Main3)}`}
                <br />
                {`${t(LocalizationKeys.Welcome.Main4)}`}
                <br />
                {`${t(LocalizationKeys.Welcome.Main5)}`}
                <br />
                <br />
                {`${t(LocalizationKeys.Welcome.End1)}`}
                <br />
                {`${t(LocalizationKeys.Welcome.End2)}`}
            </Typography>
        </Container>
    );
}
