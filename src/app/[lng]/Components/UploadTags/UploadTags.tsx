import React from "react";
import {
    Box,
    Chip,
    FormControl,
    FormLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { appTheme } from "@/app/[lng]/general/styles";
import { styles } from "@/app/[lng]/Components/UploadTags/UploadTags.style";
import { UploadTagsProps } from "@/app/[lng]/general/interfaces";
import { getSelectStyles } from "@/app/[lng]/general/utils";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function UploadTags({
    selectedTags,
    selectedTagsHandler,
    tags,
}: UploadTagsProps) {
    const { t } = useTrans();

    function handleChangeTags(
        event: SelectChangeEvent<typeof selectedTags>
    ): void {
        const {
            target: { value },
        } = event;
        const newTags = tags.filter((tag) => value.includes(tag.display));
        selectedTagsHandler(newTags.map((tag) => tag?.display));
    }

    return (
        <FormControl
            key={LocalizationKeys.Common.Tags}
            fullWidth
            required
            margin="normal"
        >
            <FormLabel>{t(LocalizationKeys.Common.Tags)}</FormLabel>
            <Select
                sx={styles.select}
                color={"secondary"}
                multiple
                value={selectedTags}
                onChange={handleChangeTags}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={styles.box}>
                        {selected.map((value, index) => (
                            <Chip key={index} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={styles.menu}
            >
                {tags.map((tag) => (
                    <MenuItem
                        key={tag.id}
                        value={tag.display}
                        style={getSelectStyles(
                            tag.display,
                            selectedTags,
                            appTheme
                        )}
                    >
                        {tag.display}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
