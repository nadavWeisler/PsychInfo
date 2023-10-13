import { Fragment } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ErrorStepProps {
    errorMsg: string;
}

export default function ErrorStep({ errorMsg }: ErrorStepProps): React.ReactElement {
    const { t } = useTranslation();

    return (
        <Fragment>
            <Typography>{t("error_occured")}</Typography>
            <Typography>{errorMsg}</Typography>
        </Fragment>
    );
};