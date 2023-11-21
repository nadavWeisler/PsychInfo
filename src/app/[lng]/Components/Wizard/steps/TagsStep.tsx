import { useState, useEffect, ReactElement } from "react";
import { Box, Button, Chip, Grid, Typography, Alert } from "@mui/material";
import { Tag, TagsStepProps } from "@/app/[lng]/general/interfaces";
import { GetAllDisplays, ListContainsById, getStringObjectDisplay } from "@/app/[lng]/general/utils";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/Wizard/steps/TagsStep.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function TagsStep({
    tags,
    updateSelectedTags,
    isError,
    errorMsg,
}: TagsStepProps): ReactElement {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [displayTags, setDisplayTags] = useState<string[]>([]);

    const { t, direction, i18n } = useTrans();

    useEffect(() => {
        updateSelectedTags(selectedTags);
    }, [selectedTags]);

    function handleChoice(tag: Tag): void {
        if (ListContainsById(selectedTags, tag.id)) {
            const index = selectedTags.indexOf(tag);
            selectedTags.splice(index, 1);
            setSelectedTags([...selectedTags]);
            setDisplayTags(GetAllDisplays(selectedTags, i18n.language));
        } else {
            setSelectedTags([...selectedTags, tag]);
            setDisplayTags([...displayTags, getStringObjectDisplay(tag, i18n.language)]);
        }
    }

    function selectAll(): void {
        setSelectedTags(tags);
        setDisplayTags(GetAllDisplays(tags, i18n.language));
    }

    function clearSelection(): void {
        setSelectedTags([]);
        setDisplayTags([]);
    }

    return (
        <Box sx={styles.root}>
            {isError ? <Alert severity="error">{errorMsg}</Alert> : null}
            <Box sx={styles.secondary}>
                <Typography dir={direction} sx={styles.typ} variant="h4">
                    {t(LocalizationKeys.Wizard.ChooseTags)}
                </Typography>
                <Button
                    dir={direction}
                    sx={styles.button}
                    variant="contained"
                    onClick={selectAll}
                >
                    {t(LocalizationKeys.Wizard.ChooseAll)}
                </Button>
                <Button
                    dir={direction}
                    sx={styles.button}
                    variant="contained"
                    onClick={clearSelection}
                >
                    {t(LocalizationKeys.Wizard.Clear)}
                </Button>
            </Box>
            <Grid dir={direction} container spacing={2}>
                {tags.map((tag) => (
                    <Grid item key={tag.id}>
                        <Chip
                            key={tag.id}
                            label={getStringObjectDisplay(tag, i18n.language)}
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
