import { Box, Chip, Grid } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { ArticleCardTagsProps } from "@/app/[lng]/general/interfaces";
export default function ArticleCardTags({ tags }: ArticleCardTagsProps) {
    const { direction } = useTrans();
    return (
        <Box component={"div"} marginTop="5px" dir={direction}>
            <Grid container spacing={1}>
                {tags?.map((tag) => (
                    <Grid item>
                        <Chip
                            key={tag.id}
                            label={tag.display}
                            variant="outlined"
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
