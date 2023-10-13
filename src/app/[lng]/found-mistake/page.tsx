"use client";
import { useState, Fragment, useEffect } from "react";
import { Typography } from "@mui/material";
import FoundMistakeForm from "@/app/[lng]/Components/FoundMistake/FoundMistakeForm";
import { useParams } from "next/navigation";
import { useTranslation } from "@/i18n/client";
import { LocaleTypes } from "@/i18n/settings";

function FoundMistakePage() {
    const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");
    const [isSent, setIsSent] = useState(false);

    const { lng } = useParams();
    const { t, i18n } = useTranslation(lng as LocaleTypes, "translation");

    const isSentHandler = () => {
        setIsSent(true);
    };

    useEffect(() => {
        setDirection(i18n.dir());
    }, [i18n.language]);
    return (
        <Fragment>
            <Typography
                margin={"30px"}
                align={"center"}
                color={"black"}
                component={"div"}
                variant={"h3"}
                dir={direction}
            >
                {t("email.greeting")}
            </Typography>
            <FoundMistakeForm isSentHandler={isSentHandler} />
            {isSent && (
                <Typography
                    color={"black"}
                    align={"center"}
                    component={"div"}
                    variant={"h3"}
                    dir={direction}
                >
                    {t("email.form_sent")}
                </Typography>
            )}
        </Fragment>
    );
}

export default FoundMistakePage;
