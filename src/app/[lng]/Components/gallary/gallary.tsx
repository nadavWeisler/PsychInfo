"use client";
import { Filter, Operator } from "@/app/[lng]/general/interfaces";
import { getContent } from "@/app/[lng]/firebase/commands";
import { pagesActions } from "@/store/pagesSlice";
import {
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";

interface GallaryProps {
    filters: Filter[];
}

export default function Gallary({ filters }: GallaryProps) {
    const locale = useParams()?.locale as LocaleTypes;
    const { t, i18n } = useTranslation(locale, "translation");
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChoice = async (filter: Filter) => {
        const results = await getContent(
            filter.organizations ?? [],
            filter.tags ?? [],
            filter.languages ?? [],
            Operator.AND
        );
        console.log(results);
        dispatch(pagesActions.UploadContent({ content: results }));
        router.push(`${i18n.language}/results`);
    };
    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" margin={"auto"}>
                {t("gallary.title")}
            </Typography>
            <Grid container spacing={4} margin={"auto"} marginBottom={"10px"}>
                {filters.map((filter) => (
                    <Grid item key={filter.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a subtle shadow on hover
                                cursor: "pointer", // Change cursor to pointer on hover
                                transition: "box-shadow 0.3s", // Smooth transition for the shadow
                                "&:hover": {
                                    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.5)", // Shadow effect on hover
                                },
                            }}
                            onClick={() => handleChoice(filter)}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: "56.25%",
                                }}
                                image={filter.img}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    {filter.title}
                                </Typography>
                                <Typography>{filter.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
