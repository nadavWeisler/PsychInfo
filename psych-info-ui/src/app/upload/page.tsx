"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { formTheme } from "@/app/General/styles";
import {
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Theme,
    ThemeProvider,
    useTheme,
} from "@mui/material";
import { AddString } from "../General/addString";
import { Texts } from "../resources/texts";
import { getOrganizations, getTags } from "../General/utils";
import { Provider } from "react-redux";
import store from "@/app/store";

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
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [selectedOrganization, setSelectedOrganization] =
        React.useState<string>("");
    const [otherOrgValue, setOtherOrgValue] = React.useState<string>("");
    const [otherTagValue, setOtherTagValue] = React.useState<string>("");
    const [openAddTagDialog, setOpenAddTagDialog] =
        React.useState<boolean>(false);
    const [openAddOrgDialog, setOpenAddOrgDialog] =
        React.useState<boolean>(false);
    const originalTags = getTags();
    const originalOrganizations = getOrganizations();
    const [tags, setTags] = React.useState<string[]>(originalTags);
    const [organizations, setOrganizations] = React.useState<string[]>(
        originalOrganizations
    );

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

    const handleOpenTagDialog = () => {
        setOpenAddTagDialog(true);
    };

    const handleCloseTagDialog = () => {
        setOpenAddTagDialog(false);
    };

    const handleCreateTag = () => {
        if (otherTagValue.trim()) {
            setSelectedTags([...selectedTags, otherTagValue]);
            setTags([...tags, otherTagValue]);
            setOtherTagValue("");
            setOpenAddTagDialog(false); // Close the dialog after adding a tag
        }
    };

    const hangleChangeOrganization = (
        event: SelectChangeEvent<typeof selectedOrganization>
    ) => {
        const {
            target: { value },
        } = event;
        setSelectedOrganization(value);
    };

    const handleOpenOrgDialog = () => {
        setOpenAddOrgDialog(true);
    };

    const handleCloseOrgDialog = () => {
        setOpenAddOrgDialog(false);
    };

    const handleCreateOrg = () => {
        if (otherOrgValue.trim()) {
            setSelectedOrganization(otherOrgValue);
            setOrganizations([...organizations, otherOrgValue]);
            setOtherOrgValue("");
            setOpenAddOrgDialog(false); // Close the dialog after adding an organization
        }
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={formTheme}>
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
                            {Texts.UPLOAD.Title}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label={Texts.COMMON.Title}
                                name="title"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="content"
                                label={Texts.COMMON.Content}
                                id="content"
                                multiline={true}
                            />
                            <FormControl margin="normal" fullWidth required>
                                <InputLabel>
                                    {Texts.COMMON.Orginiztion}
                                </InputLabel>
                                <Select
                                    value={selectedOrganization}
                                    onChange={hangleChangeOrganization}
                                >
                                    {organizations.map((org) => (
                                        <MenuItem
                                            key={org}
                                            value={org}
                                            style={getStyles(
                                                org,
                                                selectedTags,
                                                formTheme
                                            )}
                                        >
                                            {org}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="outlined"
                                onClick={handleOpenOrgDialog}
                            >
                                {Texts.UPLOAD.AddNewOrg}
                            </Button>
                            <AddString
                                handleCloseDialog={handleCloseOrgDialog}
                                handleCreate={handleCreateOrg}
                                inputValue={otherOrgValue}
                                setInputValue={setOtherOrgValue}
                                openDialog={openAddOrgDialog}
                                title={Texts.UPLOAD.AddNewOrg}
                                question={Texts.UPLOAD.AddNewOrgAsk}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="link"
                                label={Texts.COMMON.Link}
                                id="link"
                            />
                            <FormControl fullWidth required margin="normal">
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
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {tags.map((tag) => (
                                        <MenuItem
                                            key={tag}
                                            value={tag}
                                            style={getStyles(
                                                tag,
                                                selectedTags,
                                                formTheme
                                            )}
                                        >
                                            {tag}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="outlined"
                                onClick={handleOpenTagDialog}
                            >
                                {Texts.UPLOAD.AddNewTag}
                            </Button>
                            <AddString
                                handleCloseDialog={handleCloseTagDialog}
                                handleCreate={handleCreateTag}
                                inputValue={otherTagValue}
                                setInputValue={setOtherTagValue}
                                openDialog={openAddTagDialog}
                                title={Texts.UPLOAD.AddNewTag}
                                question={Texts.UPLOAD.AddNewTagAsk}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {Texts.COMMON.Save}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Provider>
    );
}
