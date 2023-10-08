import { Fragment } from "react";
import { Typography } from "@mui/material";
import TagsGrid from "@/app/Components/StepsComp/TagsGrid";

function Step1() {
    return (
        <Fragment>
            <Typography
                sx={{ marginBottom: "20px", marginTop: "20px" }}
                variant="h4"
            >
                Choose tags:
            </Typography>
            <TagsGrid />
        </Fragment>
    );
}

export default Step1;
