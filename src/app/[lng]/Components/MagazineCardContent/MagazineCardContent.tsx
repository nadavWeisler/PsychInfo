import { CardContent, Chip, Grid, Typography } from "@mui/material";
import { MagazineCardContentProps } from "@/app/[lng]/general/interfaces";

export default function MagazineCardContent({
    card,
}: MagazineCardContentProps) {
    return (
        <CardContent>
            <Typography gutterBottom variant="h5" component="h5">
                {card?.title}
            </Typography>
            <Typography>
                <Grid container spacing={1}>
                    {card?.tags.map((tag) => (
                        <Grid item key={tag?.id}>
                            <Chip key={tag?.id} label={tag?.display} />
                        </Grid>
                    ))}
                </Grid>
            </Typography>
        </CardContent>
    );
}
