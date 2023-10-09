import { useState, useEffect } from "react";
import { Chip, Grid } from "@mui/material";
import { TagsGridProps } from "@/app/General/interfaces";

function TagsGrid({
    data = [],
    addData = () => null,
    dataType = "",
}: TagsGridProps) {
    const [chipTagsArr, setChipTagsArr] = useState<string[]>([]);
    const [chipOrgArr, setChipOrgArr] = useState<string[]>([]);

    const addDataToChipArr = (data: string) => {
        switch (dataType) {
            case "tags":
                if (chipTagsArr.includes(data)) {
                    const index = chipTagsArr.indexOf(data);
                    chipTagsArr.splice(index, 1);
                    setChipTagsArr([...chipTagsArr]);
                } else {
                    setChipTagsArr([...chipTagsArr, data]);
                }
                break;
            case "organization":
                if (chipOrgArr.includes(data)) {
                    const index = chipOrgArr.indexOf(data);
                    chipOrgArr.splice(index, 1);
                    setChipOrgArr([...chipOrgArr]);
                } else {
                    setChipOrgArr([...chipOrgArr, data]);
                }
                break;
            default:
                throw new Error("Invalid data type");
        }
    };

    useEffect(() => {
        switch (dataType) {
            case "tags":
                addData(chipTagsArr);
                break;
            case "organization":
                addData(chipOrgArr);
                break;
            default:
                throw new Error("Invalid data type");
        }
    }, [chipTagsArr, chipOrgArr]);
    let chipDataArr: string[] = [];
    switch (dataType) {
        case "tags":
            chipDataArr = chipTagsArr;
            break;
        case "organization":
            chipDataArr = chipOrgArr;
            break;
        default:
            throw new Error("Invalid data type");
    }
    return (
        <Grid container spacing={2}>
            {data.map((tag, index) => (
                <Grid item xs={3} key={index}>
                    <Chip
                        key={index}
                        label={tag}
                        onClick={() => addDataToChipArr(tag)}
                        variant={
                            chipDataArr.includes(tag) ? "filled" : "outlined"
                        }
                        color="primary"
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default TagsGrid;
