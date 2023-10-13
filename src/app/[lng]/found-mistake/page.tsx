"use client";
import { useState, Fragment, useEffect, ReactElement } from "react";
import { Typography } from "@mui/material";
import FoundMistakeForm from "@/app/[lng]/Components/FoundMistake/FoundMistakeForm";
import { useParams } from "next/navigation";
import { useTranslation } from "@/i18n/client";
import { LocaleTypes } from "@/i18n/settings";

export default function FoundMistakePage(): ReactElement {
    const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");
    const [isSent, setIsSent] = useState<boolean>(false);

    const { lng } = useParams();
    const { t, i18n } = useTranslation(lng as LocaleTypes, "translation");

    useEffect(() => {
        setDirection(i18n.dir());
    }, [i18n.language]);

    return (
        <Fragment>
            <Typography
                margin={"30px"}
                align={"center"}
                color={"black"}
                variant={"h4"}
                dir={direction}
            >
                {t("email.greeting")}
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
                    {t("email.form_sent")}
                </Typography>
            )}
        </Fragment>
    );
};