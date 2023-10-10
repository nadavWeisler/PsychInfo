import { useState, useEffect, Fragment } from "react";
import { Chip, Grid, Typography } from "@mui/material";
import { Tag } from "@/app/general/interfaces";
import { GetAllDisplays, ListContainsById } from "@/app/General/utils";
import { useTranslation } from "react-i18next";

interface TagsStepProps {
    tags: Tag[];
    updateSelectedTags: (newTags: Tag[]) => void;
}

export default function TagsStep({ tags, updateSelectedTags }: TagsStepProps) {
    const { t } = useTranslation();
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [displayTags, setDisplayTags] = useState<string[]>([]);

    const handleChoice = (tag: Tag) => {
        if (ListContainsById(selectedTags, tag.id)) {
            const index = selectedTags.indexOf(tag);
            selectedTags.splice(index, 1);
            setSelectedTags([...selectedTags]);
            setDisplayTags(GetAllDisplays(selectedTags));
        } else {
            setSelectedTags([...selectedTags, tag]);
            setDisplayTags([...displayTags, tag.display]);
        }
    };

    useEffect(() => {
        updateSelectedTags(selectedTags);
    }, [selectedTags]);

    return (
        <Fragment>
            <Typography
                sx={{ marginBottom: "20px", marginTop: "20px" }}
                variant="h4"
            >
                {t("wizard.choose_tags")}
            </Typography>
            <Grid container spacing={2}>
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
        </Fragment>
    );
}
