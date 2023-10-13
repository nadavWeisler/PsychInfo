import { Fragment } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ErrorStepProps {
    errorMsg: string;
}

function ErrorStep({ errorMsg = "" }: ErrorStepProps) {
    const { t } = useTranslation();

    return (
        <Fragment>
            <Typography>{t("error_occured")}</Typography>
            <Typography>{errorMsg}</Typography>
        </Fragment>
    );
}

export default ErrorStep;
