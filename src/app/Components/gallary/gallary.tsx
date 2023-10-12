"use client";
import { Filter } from "@/app/general/interfaces";
import { pagesActions } from "@/app/store/pagesSlice";
import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

interface GallaryProps {
    filters: Filter[];
}

export default function Gallary({ filters }: GallaryProps) {
    const { t } = useTranslation();
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
        <Container maxWidth="md">
            <Typography variant="h4" align="center" margin={"auto"}>
                {t("gallary.title")}
            </Typography>
            <Grid container spacing={4} margin={"auto"} marginBottom={"10px"}>
                {filters.map((filter) => (
                    <Grid item key={filter.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column' ,
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Add a subtle shadow on hover
                                cursor: 'pointer',  // Change cursor to pointer on hover
                                transition: 'box-shadow 0.3s',  // Smooth transition for the shadow
                                '&:hover': {
                                    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.5)',  // Shadow effect on hover
                                }

                            }}

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