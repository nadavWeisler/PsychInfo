import { useState } from "react";
import { Chip, Grid } from "@mui/material";
import { tags } from "@/app/General/objects";

function TagsGrid() {
    const [chipDataArr, setChipDataArr] = useState<string[]>([]);

    const addDataToChipArr = (data: string) => {
        if (chipDataArr.includes(data)) {
            const index = chipDataArr.indexOf(data);
            chipDataArr.splice(index, 1);
            setChipDataArr([...chipDataArr]);
        } else {
            setChipDataArr([...chipDataArr, data]);
        }
    };

    return (
        <Grid container spacing={2}>
            {tags.map((tag, index) => (
                <Grid item xs={3} key={index}>
                    <Chip
                        key={index}
                        label={tag.label}
                        onClick={() => addDataToChipArr(tag.data)}
                        variant={
                            chipDataArr.includes(tag.data)
                                ? "filled"
                                : "outlined"
                        }
                        color="primary"
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default TagsGrid;
