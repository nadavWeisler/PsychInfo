import { Fragment } from "react";
import { Typography } from "@mui/material";
import TagsGrid from "@/app/Components/Wizard/TagsGrid";
import { StepProps } from "@/app/General/interfaces";

function Step1({
    data = [],
    text = "",
    addData = () => null,
    dataType = "",
}: StepProps) {
    return (
        <Fragment>
            <Typography
                sx={{ marginBottom: "20px", marginTop: "20px" }}
                variant="h4"
            >
                :בחר {text}
            </Typography>
            <TagsGrid data={data} addData={addData} dataType={dataType} />
        </Fragment>
    );
}

export default Step1;
