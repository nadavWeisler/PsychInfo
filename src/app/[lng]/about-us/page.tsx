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
    CardActionArea,
} from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import styles from "@/app/[lng]/about-us/card.module.css";

export default function AboutUs() {
    const { t } = useTrans();

    const cards = [
        {
            id: 1,
            title: t("credits.nadav_w.title"),
            description: t("credits.nadav_w.description"),
            imageUrl:
                "https://media.licdn.com/dms/image/C4D03AQE_P3IHLL6trQ/profile-displayphoto-shrink_800_800/0/1615991285399?e=1703721600&v=beta&t=Wli5uAAS8XqpjSelNVZA6tEMtFr_cgKhMoXLk_OJtPg",
        },
        {
            id: 2,
            title: t("credits.shlomi.title"),
            description: t("credits.shlomi.description"),
            imageUrl:
                "https://scontent.ftlv5-1.fna.fbcdn.net/v/t39.30808-6/395428223_10228627431285283_4333855945652097004_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dysAv2UOzR4AX8hqpJj&_nc_oc=AQmjSXzhiFjbaxbvmY7mnrl9Q1swje81ehI9y8nU2ex_BnsNW1Lfnx_GR8U27Iqk0Ug&_nc_ht=scontent.ftlv5-1.fna&oh=00_AfB_R49L5fBWTe1sS8mbzCxRXS3mKTSD4MxPmJKvG2o4yg&oe=653B9CCD",
        },
        {
            id: 3,
            title: t("credits.nadav_p.title"),
            description: t("credits.nadav_p.description"),
            imageUrl:
                "https://media.licdn.com/dms/image/C4D03AQEuJZ1UkM-Emw/profile-displayphoto-shrink_800_800/0/1572158793894?e=1703721600&v=beta&t=YE8_KRYCLddjUlblqDK9ELJ1id7OMDj55jfMWBYJQZQ",
        },
        {
            id: 4,
            title: t("credits.gaia.title"),
            description: t("credits.gaia.description"),
            imageUrl:
                "https://media.licdn.com/dms/image/D4D03AQG6GVjshybq6g/profile-displayphoto-shrink_400_400/0/1672679569607?e=1703721600&v=beta&t=Q_suFXMwBzJqbQczaIg1Fk3PSkk1b39H72JScQ0iY1Y",
        },
        {
            // TODO: add image
            id: 5,
            title: t("credits.shir.title"),
            description: t("credits.shir.description"),
            imageUrl: "https://source.unsplash.com/random?wallpapers",
        },
        {
            // TODO: change to real image and translate
            id: 6,
            title: " יותם ארן",
            description: "מפתח",
            imageUrl: "https://source.unsplash.com/random?wallpapers",
        },
        {
            id: 7,
            title: t("credits.netanel.title"),
            description: t("credits.netanel.description"),
            imageUrl:
                "https://scontent.ftlv5-1.fna.fbcdn.net/v/t39.30808-6/376914750_24785073707758843_6922480204138489649_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=1tYqaV3ttQUAX8qiefl&_nc_ht=scontent.ftlv5-1.fna&oh=00_AfD858kXlsRvv-99P2Nikc28b9fU0ycEfR4Rn_odj7Yjgg&oe=653C19EE",
        },
        {
            id: 8,
            title: t("credits.tatiana.title"),
            description: t("credits.tatiana.description"),
            imageUrl: "https://source.unsplash.com/random?wallpapers",
        },
    ];

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
                                    className={styles.hoverCard}
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            sx={{
                                                pt: "100.00%",
                                            }}
                                            component="div"
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
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </>
    );
}
