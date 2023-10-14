"use client";
import { useState, Fragment, ReactElement } from "react";
import { Typography } from "@mui/material";
import FoundMistakeForm from "@/app/[lng]/Components/FoundMistake/FoundMistakeForm";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function FoundMistakePage(): ReactElement {
    const [isSent, setIsSent] = useState<boolean>(false);

    const { t, direction } = useTrans();

    return (
        <Fragment>
            <Typography
                margin={"30px"}
                align={"center"}
                color={"black"}
                variant={"h4"}
                dir={direction}
            >
                {t("mistake.greeting")}
            </Typography>

            <FoundMistakeForm isSentHandler={() => setIsSent(true)} />

            {isSent && (
                <Typography
                    color={"black"}
                    align={"center"}
                    component={"div"}
                    variant={"h4"}
                    dir={direction}
                >
                    {t("mistake.form_sent")}
                </Typography>
            )}
        </Fragment>
    );
}
