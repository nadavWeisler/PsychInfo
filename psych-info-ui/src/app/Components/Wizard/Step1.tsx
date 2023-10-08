import { Fragment } from "react";
import { Typography } from "@mui/material";
import TagsGrid from "@/app/Components/StepsComp/TagsGrid";
import { StepProps } from "@/app/General/interfaces";

function Step1({ data = [], text = "" }: StepProps) {
    return (
        <Fragment>
            <Typography
                sx={{ marginBottom: "20px", marginTop: "20px" }}
                variant="h4"
            >
                :בחר {text}
            </Typography>
            <TagsGrid data={data} />
        </Fragment>
    );
}

export default Step1;
