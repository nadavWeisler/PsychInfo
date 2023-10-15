import { useState, useEffect, ReactElement } from "react";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { Tag } from "@/app/[lng]/general/interfaces";
import { GetAllDisplays, ListContainsById } from "@/app/[lng]/general/utils";
import useTrans from "@/app/[lng]/hooks/useTrans";

interface TagsStepProps {
    tags: Tag[];
    updateSelectedTags: (newTags: Tag[]) => void;
}

export default function TagsStep({
    tags,
    updateSelectedTags,
}: TagsStepProps): ReactElement {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [displayTags, setDisplayTags] = useState<string[]>([]);

    const { t, direction } = useTrans();

    useEffect(() => {
        updateSelectedTags(selectedTags);
    }, [selectedTags]);

    function handleChoice(tag: Tag): void {
        if (ListContainsById(selectedTags, tag.id)) {
            const index = selectedTags.indexOf(tag);
            selectedTags.splice(index, 1);
            setSelectedTags([...selectedTags]);
            setDisplayTags(GetAllDisplays(selectedTags));
        } else {
            setSelectedTags([...selectedTags, tag]);
            setDisplayTags([...displayTags, tag.display]);
        }
    }

    function selectAll(): void {
        setSelectedTags(tags);
        setDisplayTags(GetAllDisplays(tags));
    }

    function clearSelection(): void {
        setSelectedTags([]);
        setDisplayTags([]);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
                sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                    dir={direction}
                    sx={{ marginBottom: "20px", marginTop: "20px" }}
                    variant="h4"
                >
                    {t("wizard.choose_tags")}
                </Typography>
                <Button
                    dir={direction}
                    sx={{ margin: "20px" }}
                    variant="contained"
                    onClick={selectAll}
                >
                    {t("wizard.choose_all")}
                </Button>
                <Button
                    dir={direction}
                    sx={{ margin: "20px" }}
                    variant="contained"
                    onClick={clearSelection}
                >
                    {t("wizard.clear")}
                </Button>
            </Box>
            <Grid dir={direction} container spacing={2}>
                {tags.map((tag) => (
                    <Grid item key={tag.id}>
                        <Chip
                            key={tag.id}
                            label={tag.display}
                            onClick={() => handleChoice(tag)}
                            variant={
                                ListContainsById(selectedTags, tag.id)
                                    ? "filled"
                                    : "outlined"
                            }
                            color="primary"
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
