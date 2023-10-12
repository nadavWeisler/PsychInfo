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
    DisplayLanguages,
    Organization,
    StringObject,
    Tag,
} from "@/app/general/interfaces";
import { EMPTY_ORGANIZATION, EMPTY_TAG } from "@/app/general/utils";
import {
    createOrganization,
    createTag,
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
    const { t, i18n } = useTranslation();

    const [tags, setTags] = useState<Tag[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization>(EMPTY_ORGANIZATION);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");

    const [otherOrgValue, setOtherOrgValue] =
        useState<Organization>(EMPTY_ORGANIZATION);
    const [otherTagValue, setOtherTagValue] = useState<Tag>(EMPTY_TAG);

    const [openAddTagDialog, setOpenAddTagDialog] = useState<boolean>(false);
    const [openAddOrgDialog, setOpenAddOrgDialog] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    useEffect(() => {
        getAllTags(false, i18n.language).then((allTags: Tag[]) => {
            setTags(allTags);
        });
    }, [otherTagValue]);

    useEffect(() => {
        getAllOrganizations(false, i18n.language).then(
            (allOrgs: Organization[]) => {
                setOrganizations(allOrgs);
            }
        );
    }, [otherOrgValue]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newContent: Content = {
            title: data.get("title")?.toString() || "",
            description: data.get("description")?.toString() || "",
            link: data.get("link")?.toString() || "",
            tags: tags.filter((tag) => selectedTags.includes(tag.display)),
            organization: selectedOrganization,
            languageId: selectedLanguage,
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

    function setOtherOrganizationInForm(org: StringObject): void {
        setOtherOrgValue({ ...org, used: false });
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
                            onChange={(e) =>
                                setSelectedLanguage(e.target.value as string)
                            }
                            renderValue={(selected) =>
                                DisplayLanguages[
                                    selected as keyof typeof DisplayLanguages
                                ]
                            }
                        >
                            {Object.keys(DisplayLanguages).map((lang) => (
                                <MenuItem
                                    key={lang}
                                    value={lang}
                                    style={getSelectStyles(
                                        lang,
                                        selectedLanguage
                                            ? [selectedLanguage]
                                            : [],
                                        appTheme
                                    )}
                                >
                                    {
                                        DisplayLanguages[
                                            lang as keyof typeof DisplayLanguages
                                        ]
                                    }
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
