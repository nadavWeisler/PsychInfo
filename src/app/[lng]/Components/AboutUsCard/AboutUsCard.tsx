import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import { styles } from "@/app/[lng]/Components/AboutUsCard/AboutUsCard.style";
import { aboutUsCards } from "@/app/[lng]/general/resources";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function AboutUsCard() {
    const { t } = useTrans();
    return (
        <Grid container spacing={4}>
            {aboutUsCards.map((card) => (
                <Grid item key={card.id} xs={12} sm={3} md={3}>
                    <Card sx={styles.card}>
                        <CardMedia
                            sx={styles.cardMedia}
                            component="div"
                            image={card.imageUrl}
                        />
                        <CardContent sx={styles.cardContent}>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h5"
                            >
                                {t(card.title)}
                                {card.linkedin !== "" ? (
                                    <IconButton href={card.linkedin}>
                                        <LinkedInIcon />
                                    </IconButton>
                                ) : null}
                            </Typography>
                            <Typography>{t(card.description)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
