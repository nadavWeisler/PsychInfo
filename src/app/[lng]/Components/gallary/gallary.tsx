"use client";
import { Content, Filter, Operator } from "@/app/[lng]/general/interfaces";
import { getContent } from "@/app/[lng]/firebase/commands";
import { pagesActions } from "@/store/pagesSlice";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/[lng]/hooks/redux";
import { Fragment } from "react";
import useTrans from "@/app/[lng]/hooks/useTrans";

interface GallaryProps {
    filters: Filter[];
}

export default function Gallary({ filters }: GallaryProps) {
    const { t, i18n } = useTrans();
    const dispatch = useAppDispatch();
    const router = useRouter();

    async function handleChoice(filter: Filter) {
        const results: Content[] = await getContent(
            filter.organizations ?? [],
            filter.tags ?? [],
            filter.languages ?? [],
            Operator.AND
        );
        dispatch(pagesActions.UploadContent({ content: results }));
        router.push(`${i18n.language}/results`);
    }

    return (
        <Fragment>
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
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                cursor: "pointer",
                                transition: "box-shadow 0.3s",
                                "&:hover": {
                                    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.5)",
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
                                <Typography gutterBottom variant="h4">
                                    {filter.title}
                                </Typography>
                                <Typography>{filter.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
}
