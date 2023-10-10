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
import { Content, Language, Organization, StringObject, Tag } from "../general/interfaces";
import { EMPTY_ORGANIZATION, EMPTY_TAG, getTags } from "../general/utils";
import { createContent, createOrganization, createTag, getAllOrganizations, getAllTags } from "../firebase/commands";
import { useTranslation } from "react-i18next";

function getSelectStyles(obj: string, allObjects: readonly string[], theme: Theme) {
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

export default function UploadContent() {
    const { t } = useTranslation();
    const [tags, setTags] = useState<Tag[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization>(EMPTY_ORGANIZATION);
    const [selectedLanguage, setSelectedLanguage] = useState<string>(Language.Hebrew);
    const [otherOrgValue, setOtherOrgValue] = useState<Organization>(EMPTY_ORGANIZATION);
    const [otherTagValue, setOtherTagValue] = useState<Tag>(EMPTY_TAG);
    const [openAddTagDialog, setOpenAddTagDialog] = useState<boolean>(false);
    const [openAddOrgDialog, setOpenAddOrgDialog] = useState<boolean>(false);

    useEffect(() => {
        getAllTags(false).then((allTags: Tag[]) => {
            setTags(allTags)
        });
    }, [])

    useEffect(() => {
        getAllOrganizations(false).then((allOrgs: Organization[]) => {
            setOrganizations(allOrgs)
        });
    }, [])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newContent: Content = {
            title: data.get("title")?.toString() || "",
            description: data.get("description")?.toString() || "",
            link: data.get("link")?.toString() || "",
            tags: tags.filter((tag) => selectedTags.includes(tag.display)),
            organization: selectedOrganization,
            language: data.get("language")?.toString() || "",
            uploader: data.get("uploader")?.toString() || "",
        }
        createContent(newContent);
    };

    const hangleChangeTags = (event: SelectChangeEvent<typeof selectedTags>) => {
        const { target: { value }, } = event;
        const newTags = tags.filter((tag) => value.includes(tag.display));
        setSelectedTags(newTags.map((tag) => tag.display));
    };

    const handleOpenTagDialog = () => {
        setOpenAddTagDialog(true);
    };

    const handleCloseTagDialog = () => {
        setOpenAddTagDialog(false);
    };

    const handleCreateTag = async () => {
        if (otherTagValue) {
            setSelectedTags([...selectedTags, otherTagValue.display]);
            createTag(otherTagValue).then(() => {
                setOtherTagValue(EMPTY_TAG);
                setOpenAddTagDialog(false);
            });
        }
    };

    const setOtherOrganizationInForm = (org: StringObject): void => {
        setOtherOrgValue({ ...org, used: false });
    }

    const hangleChangeOrganization = (event: SelectChangeEvent<typeof selectedOrganization>) => {
        const { target: { value }, } = event;
        console.log(value);
        const newOrg = organizations.find((org) => org.id === value);
        if (newOrg) {
            setSelectedOrganization(newOrg);
        }
    };

    const handleOpenOrgDialog = () => {
        setOpenAddOrgDialog(true);
    };

    const handleCloseOrgDialog = () => {
        setOpenAddOrgDialog(false);
    };

    const handleCreateOrg = () => {
        if (otherOrgValue) {
            setSelectedOrganization(otherOrgValue);
            createOrganization(otherOrgValue).then(() => {
                setOtherOrgValue(EMPTY_ORGANIZATION);
                setOpenAddOrgDialog(false);
            });
        }
    };

    const setOtherTagInForm = (tag: StringObject): void => {
        setOtherTagValue({ ...tag, used: false });
    }

    const handleLanguageChange = (event: SelectChangeEvent<typeof selectedLanguage>) => {
        const { target: { value }, } = event;
        setSelectedLanguage(value)
    }

    return (
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
                        {t("upload.title")}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label={t("common.title")}
                            name="title"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label={t("common.description")}
                            id="description"
                            multiline={true}
                        />
                        <FormControl margin="normal" fullWidth required>
                            <InputLabel>
                                {t("common.organization")}
                            </InputLabel>
                            <Select
                                value={selectedOrganization}
                                onChange={hangleChangeOrganization}
                                renderValue={(selected) => (selected as Organization).display}
                            >
                                {organizations.map((org) => (
                                    <MenuItem
                                        key={org.id}
                                        value={org.id}
                                        style={getSelectStyles(
                                            org.id,
                                            selectedOrganization ? [selectedOrganization.id] : [],
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
                            {t("upload.create_new_organization")}
                        </Button>
                        <AddString
                            handleCloseDialog={handleCloseOrgDialog}
                            handleCreate={handleCreateOrg}
                            inputValue={otherOrgValue}
                            setInputValue={setOtherOrganizationInForm}
                            openDialog={openAddOrgDialog}
                            title={t("upload.create_new_organization")}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="link"
                            label={t("common.link")}
                            id="link"
                        />
                        <FormControl margin="normal" fullWidth required>
                            <InputLabel>{t("common.language")}</InputLabel>
                            <Select
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                            >
                                {Object.values(Language).map((lang) => (
                                    <MenuItem key={lang} value={lang}>
                                        {lang}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth required margin="normal">
                            <InputLabel id="demo-multiple-chip-label">
                                {t("common.tags")}
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
                                        key={tag.id}
                                        value={tag.display}
                                        style={getSelectStyles(
                                            tag.display,
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
                            {t("upload.create_new_tag")}
                        </Button>
                        <AddString
                            handleCloseDialog={handleCloseTagDialog}
                            handleCreate={handleCreateTag}
                            inputValue={otherTagValue}
                            setInputValue={setOtherTagInForm}
                            openDialog={openAddTagDialog}
                            title={t("upload.create_new_tag")}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="uploder"
                            required
                            label={t("common.uploader")}
                            id="uploder"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {t("common.submit")}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
