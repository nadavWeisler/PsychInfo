"use client";
import { Content, Operator, Tag } from "@/app/[lng]/general/interfaces";
import { getAllTags, getContent } from "@/app/[lng]/firebase/commands";
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { useEffect, useState } from "react";
import SingleArticle from "./singleArticle";
import { magazineCard, magazineCardSelected, magazineContainer, magazineTagsSelectionContainer, magazineTitle } from "./magazine.style";
import { ListContainsById } from "../general/utils";
import Loading from "../Components/UI/Loading";

export default function Magazine() {
    const { t, direction, i18n } = useTrans();
    const [loading, setLoading] = useState<boolean>(false);
    const [cards, setCards] = useState<Content[]>([]);
    const [selectedCard, setSelectedCard] = useState<Content | null>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        getAllTags(true, i18n.language).then((res) => {
            setTags(res);
        });
    }, []);

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

    function handleChoice(tag: Tag): void {
        if (ListContainsById(selectedTags, tag.id)) {
            const index = selectedTags.indexOf(tag);
            selectedTags.splice(index, 1);
            setSelectedTags([...selectedTags]);
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    if (loading) return <Loading />;
    return (
        <Box sx={magazineContainer}>
            <Typography
                dir={direction}
                variant="h4"
                sx={magazineTitle}
            >
                {t(LocalizationKeys.Welcome.Title)}
            </Typography>
            <Box sx={magazineTagsSelectionContainer}>
                <Grid container spacing={2}>
                    {tags?.map((tag) => (
                        <Grid item key={tag.id}>
                            <Chip
                                key={tag.id}
                                label={tag.display}
                                onClick={() => handleChoice(tag)}
                                variant={ListContainsById(selectedTags, tag.id) ? "filled" : "outlined"}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {cards.map((card) => (
                        <Grid item key={card.id} xs={12}>
                            <Card
                                key={card.id}
                                sx={card === selectedCard ? magazineCardSelected : magazineCard}
                                onClick={() => {
                                    setSelectedCard(card)
                                    window.scrollTo(0, 0);
                                }}
                            >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h5">
                                        {card.title}
                                    </Typography>
                                    <Typography>
                                        <Grid container spacing={1}>
                                            {card.tags.map((tag) => (
                                                <Grid item key={tag.id}>
                                                    <Chip key={tag.id} label={tag.display} />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={6}>
                    {selectedCard && <SingleArticle article={selectedCard} />}
                </Grid>
            </Grid>
        </Box>
    );
}
