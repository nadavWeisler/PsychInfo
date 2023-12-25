import { useState, useEffect, FormEvent } from "react";
import { Button, Box } from "@mui/material";
import {
    ContentDB,
    Organization,
    Tag,
    UploadFormProps,
} from "@/app/[lng]/general/interfaces";
import { EMPTY_ORGANIZATION } from "@/app/[lng]/general/utils";
import {
    getAllTags,
    postPendingContent,
    uploadFile,
} from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/UploadForm/UploadForm.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import UploadTitle from "@/app/[lng]/Components/UploadTitle";
import UploadOrganization from "@/app/[lng]/Components/UploadOrganization";
import UploadDescription from "@/app/[lng]/Components/UploadDescription";
import UploadLink from "@/app/[lng]/Components/UploadLink";
import UploadLanguage from "@/app/[lng]/Components/UploadLanguage";
import UploadTags from "@/app/[lng]/Components/UploadTags";
import UploadFile from "@/app/[lng]/Components/UploadFile";
import UploadUploader from "@/app/[lng]/Components/UploadUploader";

export default function UploadForm({ isSubmitHandler }: UploadFormProps) {
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization | null>(EMPTY_ORGANIZATION);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    const { t, i18n } = useTrans();

    useEffect(() => {
        getAllTags(false, i18n.language).then((allTags: Tag[]) => {
            setTags(allTags);
        });
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
        isSubmitHandler(true);
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <UploadTitle />
            <UploadDescription />
            <UploadOrganization
                selectedOrganizationHandler={setSelectedOrganization}
                selectedOrganization={selectedOrganization}
            />
            <UploadLink />
            <UploadLanguage
                selectedLanguage={selectedLanguage}
                selectedLanguageHandler={setSelectedLanguage}
            />
            <UploadTags
                tags={tags}
                selectedTags={selectedTags}
                selectedTagsHandler={setSelectedTags}
            />
            <UploadFile fileHandler={setFile} />
            <UploadUploader />
            <Button type="submit" variant="contained" sx={styles.button}>
                {t(LocalizationKeys.Common.Submit)}
            </Button>
        </Box>
    );
}
