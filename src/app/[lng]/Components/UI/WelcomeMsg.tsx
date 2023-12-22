"use client";
import { Typography, Button, Box, Container } from "@mui/material";
import { WelcomeMsgProps } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/UI/WelcomeMsg.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { homePageContainer } from "../../home-page/homePage.style";

export default function WelcomeMsg(): React.ReactElement {
  const { t, direction } = useTrans();

  return (
    <Container sx={homePageContainer}>
      <Typography dir={direction} variant="h4" gutterBottom>
        {t(LocalizationKeys.Welcome.Title)}
      </Typography>
      <Typography dir={direction} variant="h6" gutterBottom>
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
        variant="h6"
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
    </Container>
  );
}
