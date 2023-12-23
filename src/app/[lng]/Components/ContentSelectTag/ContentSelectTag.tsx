import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { ContentSelectTagProps } from "@/app/[lng]/general/interfaces";
import { appTheme } from "@/app/[lng]/general/styles";

export default function ContentSelectTag({
    tags,
    selectedTags,
    handleChangeTags,
    getSelectStyles,
}: ContentSelectTagProps) {
    const { t } = useTrans();

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
    };
    return (
        <FormControl fullWidth required margin="normal">
            <InputLabel id="demo-multiple-chip-label">
                {t(LocalizationKeys.Common.Tags)}
            </InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedTags}
                onChange={handleChangeTags}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                        }}
                    >
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
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
