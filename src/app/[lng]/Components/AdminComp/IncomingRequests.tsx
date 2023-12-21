"use client";
import { useState, useEffect } from "react";
import { Content } from "@/app/[lng]/general/interfaces";
import { Box, Typography } from "@mui/material";
import RequestAccordion from "@/app/[lng]/Components/AdminComp/RequestAccordion";
import { getPendingContent } from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/AdminComp/IncomingRequests.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function IncomingRequests() {
  const [requests, setRequests] = useState<Content[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const { t } = useTrans();

  useEffect(() => {
    getPendingContent()
      .then((requests) => {
        setRequests(requests);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isDelete]);

  return (
    <>
      <Typography sx={styles.typ} align={"center"} variant="h5" color={"black"}>
        {t(LocalizationKeys.Admin.WaitingRequests)}
      </Typography>
      {requests && requests.length > 0 ? (
        <Box sx={styles.box}>
          <RequestAccordion
            data={requests}
            deleteHandler={() => setIsDelete(!isDelete)}
          />
        </Box>
      ) : (
        <Typography
          sx={styles.typ}
          align={"center"}
          variant="h6"
          color={"black"}
        >
          {t(LocalizationKeys.Admin.NoRequests)}
        </Typography>
      )}
    </>
  );
}
