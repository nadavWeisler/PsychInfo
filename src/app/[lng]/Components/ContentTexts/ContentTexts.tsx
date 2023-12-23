import { TextField } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { ContentTextsProps } from "@/app/[lng]/general/interfaces";

export default function ContentTexts({ prevContent }: ContentTextsProps) {
    const { t } = useTrans();
    return (
        <>
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
            <TextField
                margin="normal"
                fullWidth
                name="link"
                label={t(LocalizationKeys.Common.Link)}
                id="link"
                defaultValue={prevContent.link}
            />
            <TextField
                margin="normal"
                fullWidth
                name="uploader"
                required
                label={t(LocalizationKeys.Common.Uploader)}
                id="uploader"
                defaultValue={prevContent.uploader}
            />
        </>
    );
}
