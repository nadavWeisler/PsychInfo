"use client";
import { Filter } from "@/app/general/interfaces";
import { pagesActions } from "@/app/store/pagesSlice";
import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface GallaryProps {
    filters: Filter[];
}

export default function Gallary({ filters }: GallaryProps) {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChoice = (filter: Filter) => {
        const data = {
            tags: filter.tags,
            organization: filter.organizations,
            languages: filter.languages
        }
        dispatch(pagesActions.addData(data));
        router.push("/results");
    }
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
                {filters.map((filter) => (
                    <Grid item key={filter.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            onClick={() => handleChoice(filter)}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: '56.25%',
                                }}
                                image={filter.img}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {filter.title}
                                </Typography>
                                <Typography>
                                    {filter.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container >
    );
}