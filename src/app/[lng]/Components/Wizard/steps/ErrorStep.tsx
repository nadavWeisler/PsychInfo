import { Fragment } from "react";
import { Typography } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";

interface ErrorStepProps {
    errorMsg: string;
}

export default function ErrorStep({
    errorMsg,
}: ErrorStepProps): React.ReactElement {
    const { t } = useTrans();
    return (
        <Fragment>
            <Typography data-testid="typ1">{t("errors.error_occured")}</Typography>
            <Typography data-testid="typ2">{errorMsg}</Typography>
        </Fragment>
    );
}
