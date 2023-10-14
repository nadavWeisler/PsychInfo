import { Fragment } from "react";
import { Typography } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";

interface ErrorStepProps {
    errorMsg: string;
}

export default function ErrorStep({ errorMsg }: ErrorStepProps): React.ReactElement {
    const { t } = useTrans();
    return (
        <Fragment>
            <Typography>{t("error_occured")}</Typography>
            <Typography>{errorMsg}</Typography>
        </Fragment>
    );
};