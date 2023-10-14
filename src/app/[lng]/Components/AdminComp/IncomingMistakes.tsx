"use client";
import { useState, useEffect, Fragment } from "react";
import { FoundMistakeDB } from "@/app/[lng]/general/interfaces";
import { Typography } from "@mui/material";
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
                variant="h4"
                color={"black"}
            >
                {t("admin.mistakes_requests")}
            </Typography>
            {mistakes && mistakes.length > 0 ? (
                mistakes.map((mistake, index) => (
                    <Fragment key={index}>
                        <FoundMistakeAccordion
                            id={mistake.id}
                            name={mistake.name}
                            emailToContact={mistake.emailToContact}
                            description={mistake.description}
                            deleteHandler={() => setIsDelete(!isDelete)}
                        />
                        <br />
                    </Fragment>
                ))
            ) : (
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
