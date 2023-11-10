"use client";
import { useState, Fragment, ReactElement } from "react";
import { Typography } from "@mui/material";
import FoundMistakeForm from "@/app/[lng]/Components/FoundMistake/FoundMistakeForm";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

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
                {t(LocalizationKeys.Mistake.Greeting)}
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
                    {t(LocalizationKeys.Mistake.FormSent)}
                </Typography>
            )}
        </Fragment>
    );
}
