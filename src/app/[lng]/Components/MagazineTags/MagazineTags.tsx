"use client";
import { useEffect, useState } from "react";
import { Box, Chip, Grid } from "@mui/material";
import { getAllTags } from "@/app/[lng]/firebase/commands";
import { Tag, MagazineTagsProps } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { ListContainsById } from "@/app/[lng]/general/utils";
import { styles } from "@/app/[lng]/Components/MagazineTags/MagazineTags.style";

export default function MagazineTags({
    selectedTags,
    selectTagsHandler,
}: MagazineTagsProps) {
    const [tags, setTags] = useState<Tag[]>([]);

    const { i18n } = useTrans();

    useEffect(() => {
        getAllTags(true, i18n.language).then((res) => {
            setTags(res);
        });
    }, []);

    function handleChoice(tag: Tag): void {
        if (ListContainsById(selectedTags, tag.id)) {
            const index = selectedTags.indexOf(tag);
            selectedTags.splice(index, 1);
            selectTagsHandler([...selectedTags]);
        } else {
            selectTagsHandler([...selectedTags, tag]);
        }
    }

    return (
        <Box sx={styles.box}>
            <Grid container spacing={2}>
                {tags?.map((tag) => (
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
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
