"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Chip,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  Snackbar,
  IconButton,
  FormLabel,
  Input,
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
  uploadFile,
} from "@/app/[lng]/firebase/commands";
import { styled } from "@mui/material/styles";
import useTrans from "@/app/[lng]/hooks/useTrans";
import styles from "@/app/[lng]/upload/select.module.css";
import { stylesObj } from "@/app/[lng]/upload/page.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

const CssTextField = styled(TextField)(stylesObj.textField);

function getSelectStyles(
  obj: string,
  allObjects: readonly string[],
  theme: Theme,
) {
  return {
    fontWeight:
      allObjects.indexOf(obj) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MenuProps = {
  PaperProps: {
    style: stylesObj.menu,
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
  const [file, setFile] = useState<File | null>(null);

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
      },
    );
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
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
      isFile: file !== null,
    };
    try {
      await postPendingContent(newContent);
      if (file !== null) {
        await uploadFile(file, newContent.title);
      }
    } catch (e) {
      console.log(e);
    }
    setIsSubmit(true);
  }

  function hangleChangeTags(
    event: SelectChangeEvent<typeof selectedTags>,
  ): void {
    const {
      target: { value },
    } = event;
    const newTags = tags.filter((tag) => value.includes(tag.display));
    setSelectedTags(newTags.map((tag) => tag.display));
  }

  function hangleChangeOrganization(
    event: SelectChangeEvent<typeof selectedOrganization>,
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
    reason?: string,
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
    <Box sx={stylesObj.root}>
      <Typography
        margin={"normal"}
        color={"black"}
        variant="h4"
        component="div"
        gutterBottom
        textAlign={"center"}
      >
        {t(LocalizationKeys.Upload.Title)}
      </Typography>
      <Typography
        margin={"normal"}
        color={"black"}
        variant="h5"
        component="div"
        gutterBottom
        textAlign={"center"}
      >
        {t(LocalizationKeys.Upload.Subtitle1)}
      </Typography>
      <Typography
        margin={"normal"}
        color={"black"}
        variant="h5"
        component="div"
        gutterBottom
        textAlign={"center"}
      >
        {t(LocalizationKeys.Upload.Subtitle2)}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl
          required
          key={LocalizationKeys.Common.Title}
          fullWidth
          margin="normal"
        >
          <FormLabel>{t(LocalizationKeys.Common.Title)}</FormLabel>
          <CssTextField required id="title" name="title" autoFocus />
        </FormControl>
        <FormControl
          key={LocalizationKeys.Common.Description}
          required
          fullWidth
          margin="normal"
        >
          <FormLabel>{t(LocalizationKeys.Common.Description)}</FormLabel>
          <CssTextField
            required
            name="description"
            id="description"
            multiline
          />
        </FormControl>
        <FormControl
          key={LocalizationKeys.Common.Organization}
          margin="normal"
          fullWidth
        >
          <FormLabel>{t(LocalizationKeys.Common.Organization)}</FormLabel>
          <Select
            className={styles.select}
            color={"secondary"}
            value={
              selectedOrganization === EMPTY_ORGANIZATION
                ? null
                : selectedOrganization
            }
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
                  appTheme,
                )}
              >
                {org.display}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          key={LocalizationKeys.Common.Link}
          margin="normal"
          fullWidth
        >
          <FormLabel>{t(LocalizationKeys.Common.Link)}</FormLabel>
          <CssTextField name="link" id="link" />
        </FormControl>
        <FormControl
          key={LocalizationKeys.Common.Language}
          margin="normal"
          fullWidth
          required
        >
          <FormLabel>{t(LocalizationKeys.Common.Language)}</FormLabel>
          <Select
            className={styles.select}
            color={"secondary"}
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as string)}
            renderValue={(selected) =>
              DisplayLanguages[selected as keyof typeof DisplayLanguages]
            }
          >
            {Object.keys(DisplayLanguages).map((lang) => (
              <MenuItem
                key={lang}
                value={lang}
                style={getSelectStyles(
                  lang,
                  selectedLanguage ? [selectedLanguage] : [],
                  appTheme,
                )}
              >
                {DisplayLanguages[lang as keyof typeof DisplayLanguages]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          key={LocalizationKeys.Common.Tags}
          fullWidth
          required
          margin="normal"
        >
          <FormLabel>{t(LocalizationKeys.Common.Tags)}</FormLabel>
          <Select
            className={styles.select}
            color={"secondary"}
            multiple
            value={selectedTags}
            onChange={hangleChangeTags}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={stylesObj.box}>
                {selected.map((value, index) => (
                  <Chip key={index} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {tags.map((tag) => (
              <MenuItem
                key={tag.id}
                value={tag.display}
                style={getSelectStyles(tag.display, selectedTags, appTheme)}
              >
                {tag.display}
              </MenuItem>
            ))}
          </Select>
          <br />
          <Typography color={"grey"}>
            {t(LocalizationKeys.Upload.Image)}
          </Typography>
          <Input
            id="file"
            name="file"
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                setFile(e.target.files?.[0]);
              }
            }}
            required={false}
          />
        </FormControl>
        <FormControl
          key={LocalizationKeys.Common.Uploader}
          margin="normal"
          fullWidth
          required
        >
          <FormLabel>{t(LocalizationKeys.Common.Uploader)}</FormLabel>
          <CssTextField name="uploader" id="uploader" />
        </FormControl>
        <Button type="submit" variant="contained" sx={stylesObj.button}>
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
  );
}
