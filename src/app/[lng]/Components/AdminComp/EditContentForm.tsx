import React, { useState, useEffect, FormEvent } from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Theme,
    Chip,
    OutlinedInput,
    SelectChangeEvent,
} from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import {
    getAllTags,
    getAllOrganizations,
    updateContent,
} from "@/app/[lng]/firebase/commands";
import {
    EditContentFormProps,
    Content,
    Organization,
    Tag,
    DisplayLanguages,
} from "@/app/[lng]/general/interfaces";
import { appTheme } from "@/app/[lng]/general/styles";
import { EMPTY_ORGANIZATION, EMPTY_TAG } from "@/app/[lng]/general/utils";
import { styles } from "@/app/[lng]/Components/AdminComp/EditContentForm.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

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

export default function EditContentForm({ prevContent }: EditContentFormProps) {
    const [tags, setTags] = useState<Tag[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);

    const prevTags = prevContent.tags.map((tag) => tag.display);

    const [selectedTags, setSelectedTags] = useState<string[]>(prevTags);
    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization>(prevContent.organization);
    const [selectedLanguage, setSelectedLanguage] = useState<string>(
        prevContent.languageId
    );

    const [otherOrgValue, setOtherOrgValue] =
        useState<Organization>(EMPTY_ORGANIZATION);
    const [otherTagValue, setOtherTagValue] = useState<Tag>(EMPTY_TAG);

    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const { t, i18n } = useTrans();

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

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
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
            id: prevContent.id,
        };
        await updateContent(newContent);
        setIsSubmit(true);
    }

    function hangleChangeTags(
        event: SelectChangeEvent<typeof selectedTags>
    ): void {
        const {
            target: { value },
        } = event;
        const newTags = tags.filter((tag) => value.includes(tag.display));
        setSelectedTags(newTags.map((tag) => tag.display));
    }

    function hangleChangeOrganization(
        event: SelectChangeEvent<typeof selectedOrganization>
    ): void {
        const {
            target: { value },
        } = event;
        const newOrg = organizations.find((org) => org.id === value);
        if (newOrg) {
            setSelectedOrganization(newOrg);
        }
    }

    return (
        <Box sx={styles.root}>
            <Typography variant="h4">{t(LocalizationKeys.Upload.Title)}</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label={t(LocalizationKeys.Common.Title)}
                    name="title"
                    autoFocus
                    defaultValue={prevContent.title}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label={t(LocalizationKeys.Common.Description)}
                    id="description"
                    multiline={true}
                    defaultValue={prevContent.description}
                />
                <FormControl margin="normal" fullWidth required>
                    <InputLabel>{t(LocalizationKeys.Common.Organization)}</InputLabel>
                    <Select
                        defaultValue={prevContent.organization}
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
                <TextField
                    margin="normal"
                    fullWidth
                    name="link"
                    label={t(LocalizationKeys.Common.Link)}
                    id="link"
                    defaultValue={prevContent.link}
                />
                <FormControl margin="normal" fullWidth required>
                    <InputLabel>{t(LocalizationKeys.Common.Language)}</InputLabel>
                    <Select
                        defaultValue={prevContent.languageId}
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
                                    selectedLanguage ? [selectedLanguage] : [],
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
                        {t(LocalizationKeys.Common.Tags)}
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

                <TextField
                    margin="normal"
                    fullWidth
                    name="uploader"
                    required
                    label={t(LocalizationKeys.Common.Uploader)}
                    id="uploader"
                    defaultValue={prevContent.uploader}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {t(LocalizationKeys.Common.Submit)}
                </Button>
            </Box>
            {isSubmit && (
                <Typography variant="h5">{t(LocalizationKeys.Admin.EditSuccess)}</Typography>
            )}
        </Box>
    );
}
