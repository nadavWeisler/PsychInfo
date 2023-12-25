"use client";
import { useEffect, useState } from "react";
import { Content, Operator, Tag } from "@/app/[lng]/general/interfaces";
import { getContent } from "@/app/[lng]/firebase/commands";
import { Box, Grid, Typography } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import SingleArticle from "@/app/[lng]/Components/SingleArticle";
import { styles } from "@/app/[lng]/magazine/page.style";
import Loading from "@/app/[lng]/Components/Loading";
import MagazineTags from "@/app/[lng]/Components/MagazineTags";
import MagazineCards from "@/app/[lng]/Components/MagazineCards";

export default function Magazine() {
    const { t, direction, i18n } = useTrans();
    const [loading, setLoading] = useState<boolean>(false);
    const [cards, setCards] = useState<Content[]>([]);
    const [selectedCard, setSelectedCard] = useState<Content | null>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    useEffect(() => {
        setLoading(true);
        getContent(selectedTags, [i18n.language], Operator.AND).then((res) => {
            setLoading(false);
            setCards(res);
            if (res.length > 0) {
                setSelectedCard(res[0]);
            } else {
                setSelectedCard(null);
            }
        });
    }, [selectedTags, i18n.language]);

    if (loading) return <Loading />;
    return (
        <Box sx={styles.container}>
            <Typography dir={direction} variant="h4" sx={styles.title}>
                {t(LocalizationKeys.Magazine.Title)}
            </Typography>
            <MagazineTags
                selectedTags={selectedTags}
                selectTagsHandler={(value: Tag[]) => setSelectedTags(value)}
            />
            <Grid container spacing={2}>
                <MagazineCards
                    selectedCard={selectedCard}
                    selectedCardHandler={(value: Content) =>
                        setSelectedCard(value)
                    }
                    cards={cards}
                />
                <Grid item xs={6}>
                    {selectedCard ? (
                        <SingleArticle article={selectedCard} />
                    ) : null}
                </Grid>
            </Grid>
        </Box>
    );
}
