"use client";
import { useState, useEffect } from "react";
import { FoundMistakeDB } from "@/app/[lng]/general/interfaces";
import { Box, Typography } from "@mui/material";
import { getMistakes } from "@/app/[lng]/firebase/commands";
import FoundMistakeAccordion from "@/app/[lng]/Components/FoundMistake/FoundMistakeAccordion";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/AdminComp/IncomingMistakes.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function IncomingMistakes() {
  const [mistakes, setMistakes] = useState<FoundMistakeDB[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const { t } = useTrans();

  useEffect(() => {
    getMistakes()
      .then((mistakes) => {
        setMistakes(mistakes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isDelete]);

  return (
    <>
      <Typography sx={styles.typ} align={"center"} variant="h5" color={"black"}>
        {t(LocalizationKeys.Admin.MistakesRequests)}
      </Typography>
      {mistakes && mistakes.length > 0 ? (
        <Box sx={styles.box}>
          <FoundMistakeAccordion
            data={mistakes}
            deleteHandler={() => setIsDelete(!isDelete)}
          />
          <br />
        </Box>
      ) : (
        <Typography
          sx={styles.typ}
          align={"center"}
          variant="h6"
          color={"black"}
        >
          {t(LocalizationKeys.Admin.NoMistakes)}
        </Typography>
      )}
    </>
  );
}
