"use client";
import React, { useState, useEffect, FormEvent } from "react";
import {
    Box,
    Button,
    Typography,
    Theme,
    SelectChangeEvent,
} from "@mui/material";
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
} from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { appTheme } from "@/app/[lng]/general/styles";
import { styles } from "@/app/[lng]/Components/EditContentForm/EditContentForm.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import ContentTexts from "@/app/[lng]/Components/ContentTexts";
import ContentSelectOrg from "@/app/[lng]/Components/ContentSelectOrg";
import ContentSelectTag from "@/app/[lng]/Components/ContentSelectTag";
import ContentSelectLang from "@/app/[lng]/Components/ContentSelectLang";

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

export default function EditContentForm({ prevContent }: EditContentFormProps) {
    const [tags, setTags] = useState<Tag[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const prevTags = prevContent.tags.map((tag) => tag.display);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<string[]>(prevTags);
    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization>(prevContent.organization);
    const [selectedLanguage, setSelectedLanguage] = useState<string>(
        prevContent.languageId
    );

    const { t, i18n } = useTrans();

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
        const newContent: Content = {
            title: data.get("title")?.toString() || "",
            description: data.get("description")?.toString() || "",
            link: data.get("link")?.toString() || "",
            tags: tags.filter((tag) => selectedTags.includes(tag.display)),
            organization: selectedOrganization,
            languageId: selectedLanguage,
            uploader: data.get("uploader")?.toString() || "",
            id: prevContent.id,
            isFile: prevContent.isFile,
        };
        await updateContent(newContent);
        setIsSubmit(true);
    }

    function handleChangeTags(
        event: SelectChangeEvent<typeof selectedTags>
    ): void {
        const {
            target: { value },
        } = event;
        const newTags = tags.filter((tag) => value.includes(tag.display));
        setSelectedTags(newTags.map((tag) => tag.display));
    }

    function handleChangeOrganization(
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
            <Typography variant="h4">
                {t(LocalizationKeys.Upload.Title)}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <ContentTexts prevContent={prevContent} />
                <ContentSelectOrg
                    prevContent={prevContent}
                    organizations={organizations}
                    selectedOrganization={selectedOrganization}
                    handleChangeOrganization={handleChangeOrganization}
                    getSelectStyles={getSelectStyles}
                    appTheme={appTheme}
                />
                <ContentSelectLang
                    prevContent={prevContent}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                    getSelectStyles={getSelectStyles}
                />
                <ContentSelectTag
                    tags={tags}
                    selectedTags={selectedTags}
                    handleChangeTags={handleChangeTags}
                    getSelectStyles={getSelectStyles}
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
                <Typography variant="h5">
                    {t(LocalizationKeys.Admin.EditSuccess)}
                </Typography>
            )}
        </Box>
    );
}
