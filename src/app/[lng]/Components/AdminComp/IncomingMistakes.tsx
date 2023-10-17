"use client";
import { useState, useEffect, Fragment } from "react";
import { FoundMistakeDB } from "@/app/[lng]/general/interfaces";
import { Box, Typography } from "@mui/material";
import { getMistakes } from "@/app/[lng]/firebase/commands";
import FoundMistakeAccordion from "@/app/[lng]/Components/FoundMistake/FoundMistakeAccordion";
import useTrans from "@/app/[lng]/hooks/useTrans";

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
        <Fragment>
            <Typography
                sx={{ mt: 3, mb: 5 }}
                align={"center"}
                variant="h5"
                color={"black"}
            >
                {t("admin.mistakes_requests")}
            </Typography>
            {mistakes && mistakes.length > 0 ? (
                <Box sx={{ marginBottom: "10px" }}>
                    <FoundMistakeAccordion
                        data={mistakes}
                        deleteHandler={() => setIsDelete(!isDelete)}
                    />
                    <br />
                </Box>
            ) : (
                // )
                <Typography
                    sx={{ mt: 3, mb: 5 }}
                    align={"center"}
                    variant="h6"
                    color={"black"}
                >
                    {t("admin.no_mistakes")}
                </Typography>
            )}
        </Fragment>
    );
}
