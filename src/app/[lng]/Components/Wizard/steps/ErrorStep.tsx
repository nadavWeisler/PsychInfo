import { Fragment } from "react";
import { Typography } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

interface ErrorStepProps {
    errorMsg: string;
}

export default function ErrorStep({ errorMsg }: ErrorStepProps): React.ReactElement {
    const { t } = useTrans();
    return (
        <Fragment>
            <Typography>{t(LocalizationKeys.Errors.ErrorOccured)}</Typography>
            <Typography>{errorMsg}</Typography>
        </Fragment>
    );
};