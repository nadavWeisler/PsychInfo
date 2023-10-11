"use client";
import { useState, useEffect, FormEvent } from "react";
import {
    Button,
    CssBaseline,
    TextField,
    Box,
    Container,
    Typography,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Theme,
} from "@mui/material";
import { appTheme } from "@/app/general/styles";
import { AddString } from "../Components/addString";
import {
    Content,
    Language,
    Organization,
    StringObject,
    Tag,
} from "@/app/general/interfaces";
import {
    EMPTY_LANGUAGE,
    EMPTY_ORGANIZATION,
    EMPTY_TAG,
} from "@/app/general/utils";
import {
    createLanguage,
    createOrganization,
    createTag,
    getAllLanguages,
    getAllOrganizations,
    getAllTags,
    postPendingContent,
} from "../firebase/commands";
import { useTranslation } from "react-i18next";

function getSelectStyles(
    obj: string,
    allObjects: readonly string[],
    theme: Theme
) {
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
    const [languages, setLanguages] = useState<Language[]>([]);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization>(EMPTY_ORGANIZATION);
    const [selectedLanguage, setSelectedLanguage] =
        useState<Language>(EMPTY_LANGUAGE);

    const [otherOrgValue, setOtherOrgValue] =
        useState<Organization>(EMPTY_ORGANIZATION);
    const [otherTagValue, setOtherTagValue] = useState<Tag>(EMPTY_TAG);
    const [otherLangValue, setOtherLangValue] =
        useState<Language>(EMPTY_LANGUAGE);

    const [openAddTagDialog, setOpenAddTagDialog] = useState<boolean>(false);
    const [openAddOrgDialog, setOpenAddOrgDialog] = useState<boolean>(false);
    const [openAddLangDialog, setOpenAddLangDialog] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    useEffect(() => {
        getAllTags(false).then((allTags: Tag[]) => {
            setTags(allTags);
        });
    }, [otherTagValue]);

    useEffect(() => {
        getAllOrganizations(false).then((allOrgs: Organization[]) => {
            setOrganizations(allOrgs);
        });
    }, [otherOrgValue]);

    useEffect(() => {
        getAllLanguages(false).then((allLangs: Language[]) => {
            setLanguages(allLangs);
        });
    }, [otherLangValue]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newContent: Content = {
            title: data.get("title")?.toString() || "",
            description: data.get("description")?.toString() || "",
            link: data.get("link")?.toString() || "",
            tags: tags.filter((tag) => selectedTags.includes(tag.display)),
            organization: selectedOrganization,
            language: selectedLanguage,
            uploader: data.get("uploader")?.toString() || "",
        };
        await postPendingContent(newContent);
        setIsSubmit(true);
    }

    function hangleChangeTags(event: SelectChangeEvent<typeof selectedTags>) {
        const {
            target: { value },
        } = event;
        const newTags = tags.filter((tag) => value.includes(tag.display));
        setSelectedTags(newTags.map((tag) => tag.display));
    }

    function hangleChangeOrganization(
        event: SelectChangeEvent<typeof selectedOrganization>
    ) {
        const {
            target: { value },
        } = event;
        const newOrg = organizations.find((org) => org.id === value);
        if (newOrg) {
            setSelectedOrganization(newOrg);
        }
    }

    function handleChangeLanguage(
        event: SelectChangeEvent<typeof selectedLanguage>
    ) {
        const {
            target: { value },
        } = event;
        const newLang = languages.find((lang) => lang.id === value);
        if (newLang) {
            setSelectedLanguage(newLang);
        }
    }

    async function handleCreateTag(): Promise<void> {
        if (otherTagValue) {
            setSelectedTags([...selectedTags, otherTagValue.display]);
            await createTag(otherTagValue).then(() => {
                setOtherTagValue(EMPTY_TAG);
                setOpenAddTagDialog(false);
            });
        }
    }

    async function handleCreateOrg() {
        if (otherOrgValue) {
            setSelectedOrganization(otherOrgValue);
            await createOrganization(otherOrgValue).then(() => {
                setOtherOrgValue(EMPTY_ORGANIZATION);
                setOpenAddOrgDialog(false);
            });
        }
    }

    async function handleCreateLanguage() {
        if (otherLangValue) {
            setSelectedLanguage(otherLangValue);
            await createLanguage(otherLangValue).then(() => {
                setOtherLangValue(EMPTY_LANGUAGE);
                setOpenAddLangDialog(false);
            });
        }
    }

    function setOtherOrganizationInForm(org: StringObject): void {
        setOtherOrgValue({ ...org, used: false });
    }

    function setOtherLangInForm(lang: StringObject): void {
        setOtherLangValue({ ...lang, used: false });
    }

    function setOtherTagInForm(tag: StringObject): void {
        setOtherTagValue({ ...tag, used: false });
    }

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
                        <InputLabel>{t("common.organization")}</InputLabel>
                        <Select
                            value={selectedOrganization}
                            onChange={hangleChangeOrganization}
                            renderValue={(selected) =>
                                (selected as Organization).display
                            }
                        >
                            {organizations.map((org) => (
                                <MenuItem
                                    key={org.id}
                                    value={org.id}
                                    style={getSelectStyles(
                                        org.id,
                                        selectedOrganization
                                            ? [selectedOrganization.id]
                                            : [],
                                        appTheme
                                    )}
                                >
                                    {org.display}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenAddOrgDialog(true)}
                    >
                        {t("upload.create_new_organization")}
                    </Button>
                    <AddString
                        handleCloseDialog={() => setOpenAddOrgDialog(false)}
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
                            onChange={handleChangeLanguage}
                            renderValue={(selected) =>
                                (selected as Language).display
                            }
                        >
                            {languages.map((lang) => (
                                <MenuItem
                                    key={lang.id}
                                    value={lang.id}
                                    style={getSelectStyles(
                                        lang.id,
                                        selectedLanguage
                                            ? [selectedLanguage.id]
                                            : [],
                                        appTheme
                                    )}
                                >
                                    {lang.display}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenAddLangDialog(true)}
                    >
                        {t("upload.create_new_language")}
                    </Button>
                    <AddString
                        handleCloseDialog={() =>
                            setOpenAddLangDialog(false)
                        }
                        handleCreate={handleCreateLanguage}
                        inputValue={otherLangValue}
                        setInputValue={setOtherLangInForm}
                        openDialog={openAddLangDialog}
                        title={t("upload.create_new_language")}
                    />
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
                    <Button
                        variant="outlined"
                        onClick={() => setOpenAddTagDialog(true)}
                    >
                        {t("upload.create_new_tag")}
                    </Button>
                    <AddString
                        handleCloseDialog={() => setOpenAddTagDialog(false)}
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
                {isSubmit && (
                    <Typography component="h1" variant="h5">
                        הטופס נשלח בהצלחה, והוא ממתין לאישור מנהל
                    </Typography>
                )}
            </Box>
        </Container>
    );
}
