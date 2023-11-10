"use client";
import { Content, Filter, Operator } from "@/app/[lng]/general/interfaces";
import { getContent } from "@/app/[lng]/firebase/commands";
import { pagesActions } from "@/store/pagesSlice";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/[lng]/hooks/redux";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/gallary/gallary.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

interface GallaryProps {
    filters: Filter[];
}

export default function Gallary({ filters }: GallaryProps) {
    const { t, i18n } = useTrans();
    const dispatch = useAppDispatch();
    const router = useRouter();

    async function handleChoice(filter: Filter) {
        const results: Content[] = await getContent(
            filter.tags ?? [],
            filter.languages ?? [],
            Operator.AND,
            filter.organizations ?? []
        );
        dispatch(pagesActions.UploadContent({ content: results }));
        router.push(`/${i18n.language}/results`);
    }

    return (
        <>
            <Typography variant="h4" align="center" margin={"auto"}>
                {t(LocalizationKeys.Gallary.Title)}
            </Typography>
            <Grid container spacing={4} margin={"auto"} marginBottom={"10px"}>
                {filters.map((filter) => (
                    <Grid item key={filter.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={styles.card}
                            onClick={() => handleChoice(filter)}
                        >
                            <CardMedia
                                component="div"
                                sx={styles.cardMedia}
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
        </>
    );
}
