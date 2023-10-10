"use client";
import { Filter } from "@/app/general/interfaces";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";

interface GallaryProps {
    filters: Filter[];
}

export default function Gallary({ filters }: GallaryProps) {
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
                {filters.map((filter) => (
                    <Grid item key={filter.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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
                            <CardActions>
                                <Button size="small">View</Button>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container >
    );
}