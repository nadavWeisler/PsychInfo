import { useState } from "react";
import { Chip, Grid } from "@mui/material";
import { TagsGridProps } from "@/app/General/interfaces";

function TagsGrid({ data = [] }: TagsGridProps) {
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
