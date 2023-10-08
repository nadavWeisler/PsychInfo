import { Fragment } from "react";
import { Typography } from "@mui/material";

interface ErrorStepProps {
    errorMsg: string;
}

function ErrorStep({ errorMsg = "" }: ErrorStepProps) {
    return (
        <Fragment>
            <Typography>An error has occured:</Typography>
            <Typography>{errorMsg}</Typography>
        </Fragment>
    );
}

export default ErrorStep;
