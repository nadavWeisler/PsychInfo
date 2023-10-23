"use client";
import {
    Card,
    CardContent,
    CardMedia,
    CssBaseline,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";

const cards = [
    {
        id: 1,
        title: "נדב וויסלר",
        description: "יוזם ומנהל האתר",
        imageUrl: "https://source.unsplash.com/random?wallpapers",
    },
    {
        id: 2,
        title: "שלומי שטרית",
        description: "מפתח",
        imageUrl: "https://source.unsplash.com/random?wallpapers",
    },
    {
        id: 3,
        title: "נדב",
        description: "מפתח",
        imageUrl: "https://source.unsplash.com/random?wallpapers",
    },
    {
        id: 4,
        title: "גאיה",
        description: "",
        imageUrl: "https://source.unsplash.com/random?wallpapers",
    },
    {
        id: 5,
        title: "שיר",
        description: "אחראית תוכן",
        imageUrl: "https://source.unsplash.com/random?wallpapers",
    },
    {
        id: 6,
        title: " יותם ארן",
        description: "מפתח",
        imageUrl: "https://source.unsplash.com/random?wallpapers",
    },
];

export default function AboutUs() {
    const { t } = useTrans();
    return (
        <>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {t("about_us.title")}
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            {t("about_us.description")}
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            pt: "56.25%",
                                        }}
                                        image={card.imageUrl}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {card.title}
                                        </Typography>
                                        <Typography>
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </>
    );
}
