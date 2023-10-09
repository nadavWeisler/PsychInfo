"use client";
import { useState, useEffect, FormEvent } from "react";
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
} from "@mui/material";
import { AddString } from "../Components/addString";
import { Texts } from "../resources/texts";
import { Provider } from "react-redux";
import store from "@/app/store";
import { Organization, StringObject, Tag } from "../general/interfaces";
import { EMPTY_ORGANIZATION, EMPTY_TAG } from "../general/utils";

function getSelectStyles(obj: StringObject, allObjects: readonly StringObject[], theme: Theme) {
    return {
        fontWeight:
            allObjects.indexOf(obj) === -1
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
    const [tags, setTags] = useState<Tag[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization>();
    const [otherOrgValue, setOtherOrgValue] = useState<Organization>(EMPTY_ORGANIZATION);
    const [otherTagValue, setOtherTagValue] = useState<Tag>(EMPTY_TAG);
    const [openAddTagDialog, setOpenAddTagDialog] = useState<boolean>(false);
    const [openAddOrgDialog, setOpenAddOrgDialog] = useState<boolean>(false);

    useEffect(() => {
        fetch('/api/data/tags')
            .then((res) => res.json())
            .then((data) => {
                setTags(data)
            })
    }, [])

    useEffect(() => {
        fetch('/api/data/orginizations')
            .then((res) => res.json())
            .then((data) => {
                setOrganizations(data)
            })
    }, [])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            "title": data.get("title"),
            "content": data.get("content"),
            "link": data.get("link"),
            "tags": selectedTags,
            "organization": selectedOrganization,
        }
        console.log(formData);
        try {
            // Make a POST request using the fetch API
            const response = await fetch('/api/data/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Handle the response as needed
            const data = await response.json();
            console.log('Response:', data);
        } catch (error) {
            // Handle any errors
            console.error('Error:', error);
        }
    };

    const hangleChangeTags = (event: SelectChangeEvent<typeof selectedTags>) => {
        const {
            target: { value },
        } = event;
        console.log(value);
    };

    const handleOpenTagDialog = () => {
        setOpenAddTagDialog(true);
    };

    const handleCloseTagDialog = () => {
        setOpenAddTagDialog(false);
    };

    const handleCreateTag = async () => {
        if (otherTagValue) {
            setSelectedTags([...selectedTags, otherTagValue]);

            const formData = {
                "displayName": otherTagValue,
                "used": false
            };

            try {
                const fetchPromise = fetch('/api/data/tags', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const response = await fetchPromise;

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Response:', data);
            } catch (error) {
                console.error('Error:', error);
            }

            setOtherTagValue(EMPTY_TAG);
            setOpenAddTagDialog(false);
        }
    };

    const setOtherOrganizationInForm = (org: StringObject) => {
        setOtherOrgValue({ ...org, used: false});
    }

    const hangleChangeOrganization = (event: SelectChangeEvent<typeof selectedOrganization>) => {
        const { target: { value }, } = event;
        setSelectedOrganization(organizations.find(org => org.id === value));
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
            setOtherOrgValue("");
            setOpenAddOrgDialog(false);
        }
    };

    const setOtherTagInForm = (tag: StringObject) => {
        setOtherTagValue({ ...tag, used: false});
    }

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
                                            key={org.id}
                                            value={org.id}
                                            style={getSelectStyles(
                                                org,
                                                selectedOrganization ? [selectedOrganization] : [],
                                                formTheme
                                            )}
                                        >
                                            {org.display}
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
                                setInputValue={setOtherOrganizationInForm}
                                openDialog={openAddOrgDialog}
                                title={Texts.UPLOAD.AddNewOrg}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="link"
                                label={Texts.COMMON.Link}
                                id="link"
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                required
                                name="language"
                                label={Texts.COMMON.Language}
                                id="language"
                            />
                            <FormControl fullWidth required margin="normal">
                                <InputLabel id="demo-multiple-chip-label">
                                    {Texts.COMMON.Tags}
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
                                                    key={value.id}
                                                    label={value.display}
                                                />
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
                                                tag,
                                                selectedTags,
                                                formTheme
                                            )}
                                        >
                                            {tag.display}
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
                                setInputValue={setOtherTagInForm}
                                openDialog={openAddTagDialog}
                                title={Texts.UPLOAD.AddNewTag}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="person"
                                required
                                label={Texts.COMMON.Uploader}
                                id="person"
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
