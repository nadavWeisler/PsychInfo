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
import styles from "@/app/[lng]/about-us/card.module.css";
import { stylesObj } from "@/app/[lng]/about-us/page.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function AboutUs() {
    const { t } = useTrans();

    const cards = [
        {
            id: 1,
            title: t(LocalizationKeys.Credits.Shir.Title),
            description: t(LocalizationKeys.Credits.Shir.Description),
            imageUrl: "https://i.ibb.co/FbvRRPC/shir.jpg",
        },
        {
            id: 2,
            title: t(LocalizationKeys.Credits.NadavW.Title),
            description: t(LocalizationKeys.Credits.NadavW.Description),
            imageUrl:
                "https://media.licdn.com/dms/image/C4D03AQE_P3IHLL6trQ/profile-displayphoto-shrink_800_800/0/1615991285399?e=1703721600&v=beta&t=Wli5uAAS8XqpjSelNVZA6tEMtFr_cgKhMoXLk_OJtPg",
        },
        {
            id: 3,
            title: t(LocalizationKeys.Credits.Shlomi.Title),
            description: t(LocalizationKeys.Credits.Shlomi.Description),
            imageUrl: "https://i.ibb.co/YjZkfHZ/shlomi.jpg",
        },
        {
            id: 4,
            title: t(LocalizationKeys.Credits.NadavP.Title),
            description: t(LocalizationKeys.Credits.NadavP.Description),
            imageUrl:
                "https://media.licdn.com/dms/image/C4D03AQEuJZ1UkM-Emw/profile-displayphoto-shrink_800_800/0/1572158793894?e=1703721600&v=beta&t=YE8_KRYCLddjUlblqDK9ELJ1id7OMDj55jfMWBYJQZQ",
        },
        {
            id: 5,
            title: t(LocalizationKeys.Credits.Gaia.Title),
            description: t(LocalizationKeys.Credits.Gaia.Description),
            imageUrl:
                "https://media.licdn.com/dms/image/D4D03AQG6GVjshybq6g/profile-displayphoto-shrink_400_400/0/1672679569607?e=1703721600&v=beta&t=Q_suFXMwBzJqbQczaIg1Fk3PSkk1b39H72JScQ0iY1Y",
        },
        {
            id: 6,
            title: t(LocalizationKeys.Credits.Ana.Title),
            description: t(LocalizationKeys.Credits.Ana.Description),
            imageUrl: "https://source.unsplash.com/random?wallpapers",
        },
        {
            id: 7,
            title: t(LocalizationKeys.Credits.Yotam.Title),
            description: t(LocalizationKeys.Credits.Yotam.Description),
            imageUrl:
                "https://media.licdn.com/dms/image/C4D03AQFMTy-Dfu3CKw/profile-displayphoto-shrink_800_800/0/1643667356760?e=1703721600&v=beta&t=skDopRpiph1z57gaaalTTafNcKZemRbNvVAJctwQLH8",
        },
        {
            id: 8,
            title: t(LocalizationKeys.Credits.Netanel.Title),
            description: t(LocalizationKeys.Credits.Netanel.Description),
            imageUrl: "https://i.ibb.co/WBLYHc6/netanel.jpg",
        },
        {
            id: 9,
            title: t(LocalizationKeys.Credits.Tatiana.Title),
            description: t(LocalizationKeys.Credits.Tatiana.Description),
            imageUrl: "https://source.unsplash.com/random?wallpapers",
        },
    ];

    return (
        <>
            <CssBaseline />
            <main>
                <Box sx={stylesObj.root}>
                    <Container maxWidth="md">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            {t(LocalizationKeys.AboutUs.Title)}
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            {
                                "כולנו מתנהלים כעת בתקופה חריגה ומערערת, שאנחנו לא יודעים כמה זמן היא תימשך, ושהתחילה בבת אחת, בהפתעה גמורה."
                            }
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            {
                                "משפט שחוזרים עליו רבות בזמנים אלו, הוא שטראומה היא תגובה נורמלית למצב לא נורמלי. זה בסדר אם אתם מוצפים רגשית, או לא מרגישים מוצפים כלל. זה בסדר גם אם אתם לא מעוניינים לגשת או לחשוב בכלל על התקופה וההתמודדות הכרוכה בה."
                            }
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            {
                                "יחד עם זאת, מי שירצה לחפש מידע על התמודדות נפשית בימים אלו, ימצא הצפה מבהילה ולפרקים מתנגשת או בלתי ניתנת לתיעדוף, של מידע באינטרנט בכלל וברשתות החברתיות בפרט. המצב הנוכחי הביא לכך שאנשי מקצוע רבים וטובים הציעו את עזרתם, הפיצו מהידע שלהם על בריאות נפשית בזמנים טראומטיים, ושחררו תוכן רב מסוגים שונים ולצרכים שונים."
                            }
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            {
                                "אנחנו, חבורת מתנדבים רב-תחומית של מתכנתים, מתרגמים, חוקרי פסיכולוגיה ואנשי תוכן, הרגשנו את ההצפה הזו בעצמנו, והחלטנו לנסות לאגד ולאמת את כל התוכן הזה, הפרוס בפנינו, שלפעמים הכמות שלו עשויה להבהיל בפני עצמה."
                            }
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            {
                                "הפלטפורמה שאנחנו בונים ומשפרים ללא הרף נועדה להנגיש לכולנו מידע אמין בלבד על התמודדות נפשית, באופן שיהיה ניתן לסינון, מותאם אישית אליכם, למקום בו המצב הזה תופס אתכם ולתוכן שאתם זקוקים לו."
                            }
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            {
                                "נשמח אם תעלו גם אתם תכנים שאתם נתקלים בהם כדי שהאתר ימשיך להתעדכן כל הזמן בתוכן מדויק ומגוון ככל שניתן. כל העלאה כמובן עוברת את אישורנו לפני כן, לטובת אימות מהימנות המקור."
                            }
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            {`אנחנו מקווים שהאתר הזה יוכל לסייע לכם!`}
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            {"צוות המתנדבים שלנו:"}
                        </Typography>
                    </Container>
                </Box>
                <Container sx={stylesObj.container} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card.id} xs={12} sm={6} md={4}>
                                <Card
                                    className={styles.hoverCard}
                                    sx={stylesObj.card}
                                >
                                    <CardMedia
                                        sx={stylesObj.cardMedia}
                                        component="div"
                                        image={card.imageUrl}
                                    />
                                    <CardContent sx={stylesObj.cardContent}>
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
