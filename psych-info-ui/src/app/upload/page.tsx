"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Theme,
    useTheme,
} from "@mui/material";
import { getTags, getOrganizations } from "@/app/General/utils";

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function UploadSource() {
    const theme = useTheme();
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [selectedOrganization, setSelectedOrganization] =
        React.useState<string>("");
    const [otherOrgValue, setOtherOrgValue] = React.useState<string>("");

    const tags = getTags();
    const organizations = getOrganizations();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log({
            title: data.get("title"),
            content: data.get("content"),
            link: data.get("link"),
            tags: selectedTags,
            organization:
                selectedOrganization === "other"
                    ? otherOrgValue
                    : selectedOrganization,
        });
    };

    const hangleChangeTags = (
        event: SelectChangeEvent<typeof selectedTags>
    ) => {
        const {
            target: { value },
        } = event;
        setSelectedTags(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const hangleChangeOrganization = (
        event: SelectChangeEvent<typeof selectedOrganization>
    ) => {
        const {
            target: { value },
        } = event;
        setSelectedOrganization(value);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "auto",
                }}
            >
                <Typography component="h1" variant="h5">
                    העלאת מקור חדש
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="כותרת"
                        name="title"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="content"
                        label="תוכן"
                        id="content"
                        multiline={true}
                    />
                    <FormControl fullWidth>
                        <InputLabel>בחר ארגון</InputLabel>
                        <Select
                            value={selectedOrganization}
                            onChange={hangleChangeOrganization}
                        >
                            {organizations.map((org) => (
                                <MenuItem
                                    key={org}
                                    value={org}
                                    style={getStyles(org, selectedTags, theme)}
                                >
                                    {org}
                                </MenuItem>
                            ))}
                            <MenuItem value="other">אחר</MenuItem>
                        </Select>
                        {selectedOrganization === "other" && (
                            <TextField
                                label="אחר"
                                value={otherOrgValue}
                                onChange={(e) =>
                                    setOtherOrgValue(e.target.value)
                                }
                            />
                        )}
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="link"
                        label="קישור"
                        type="link"
                        id="link"
                        autoComplete="link"
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-chip-label">
                            תגיות
                        </InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={selectedTags}
                            onChange={hangleChangeTags}
                            input={
                                <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                />
                            }
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
                                    key={tag}
                                    value={tag}
                                    style={getStyles(tag, selectedTags, theme)}
                                >
                                    {tag}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        העלאה
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
