"use client";
import { useState, useEffect, FormEvent } from "react";
import {
    Button,
    TextField,
    Box,
    Typography,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Theme,
    Snackbar,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { appTheme } from "@/app/[lng]/general/styles";
import {
    ContentDB,
    DisplayLanguages,
    Organization,
    Tag,
} from "@/app/[lng]/general/interfaces";
import { EMPTY_ORGANIZATION } from "@/app/[lng]/general/utils";
import {
    getAllOrganizations,
    getAllTags,
    postPendingContent,
} from "@/app/[lng]/firebase/commands";
import { styled } from "@mui/material/styles";
import useTrans from "@/app/[lng]/hooks/useTrans";
import styles from "@/app/[lng]/upload/select.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { stylesObj } from "@/app/[lng]/upload/page.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

const theme = createTheme({
    palette: {
        secondary: {
            main: "#0f0f0f",
        },
    },
});

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#0f0f0f",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#0f0f0f",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#0f0f0f",
        },
        "&:hover fieldset": {
            borderColor: "#0f0f0f",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#0f0f0f",
        },
    },
});

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
    const [tags, setTags] = useState<Tag[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization | null>(EMPTY_ORGANIZATION);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const { t, i18n, direction } = useTrans();

    useEffect(() => {
        getAllTags(false, i18n.language).then((allTags: Tag[]) => {
            setTags(allTags);
        });
    }, []);

    useEffect(() => {
        getAllOrganizations(false, i18n.language).then(
            (allOrgs: Organization[]) => {
                setOrganizations(allOrgs);
            }
        );
    }, []);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newContent: ContentDB = {
            title: data.get("title")?.toString() || "",
            description: data.get("description")?.toString() || "",
            link: data.get("link")?.toString() || "",
            tags: tags.filter((tag) => selectedTags.includes(tag.display)),
            organization: selectedOrganization as Organization,
            languageId: selectedLanguage,
            uploader: data.get("uploader")?.toString() || "",
        };
        await postPendingContent(newContent);
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

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setIsSubmit(false);
    };

    const action = (
        <IconButton
            dir={direction}
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            sx={stylesObj.iconBtn}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={stylesObj.root}>
                <Typography variant="h4">{t(LocalizationKeys.Upload.Title)}</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <CssTextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label={t(LocalizationKeys.Common.Title)}
                        name="title"
                        autoFocus
                    />
                    <CssTextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label={t(LocalizationKeys.Common.Description)}
                        id="description"
                        multiline={true}
                    />
                    <FormControl margin="normal" fullWidth>
                        <InputLabel>{`${t(LocalizationKeys.Common.Organization)} (${t(
                            "common.not_required"
                        )})`}</InputLabel>
                        <Select
                            className={styles.select}
                            color={"secondary"}
                            value={
                                selectedOrganization === EMPTY_ORGANIZATION
                                    ? null
                                    : selectedOrganization
                            }
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
                    <CssTextField
                        margin="normal"
                        fullWidth
                        name="link"
                        label={t(LocalizationKeys.Common.Link)}
                        id="link"
                    />
                    <FormControl margin="normal" fullWidth required>
                        <InputLabel>{t(LocalizationKeys.Common.Language)}</InputLabel>
                        <Select
                            className={styles.select}
                            color={"secondary"}
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
                            {t(LocalizationKeys.Common.Tags)}
                        </InputLabel>
                        <Select
                            className={styles.select}
                            color={"secondary"}
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
                                <Box sx={stylesObj.box}>
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
                    <CssTextField
                        margin="normal"
                        fullWidth
                        name="uploader"
                        required
                        label={t(LocalizationKeys.Common.Uploader)}
                        id="uploader"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={stylesObj.button}
                    >
                        {t(LocalizationKeys.Common.Submit)}
                    </Button>
                </Box>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={isSubmit}
                    onClose={handleClose}
                    message={t(LocalizationKeys.Upload.SubmitSuccess)}
                    autoHideDuration={6000}
                    action={action}
                />
            </Box>
        </ThemeProvider>
    );
}
