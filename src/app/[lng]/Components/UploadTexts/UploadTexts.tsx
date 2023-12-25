
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { Typography } from "@mui/material";

export default function UploadTexts() {
    const { t } = useTrans();

    const headers = [
        {
            text: t(LocalizationKeys.Upload.Title),
            variant: "h4",
        },
        {
            text: t(LocalizationKeys.Upload.Subtitle1),
            variant: "h5",
        },
        {
            text: t(LocalizationKeys.Upload.Subtitle2),
            variant: "h5",
        },
    ];

    return (
        <>
            {headers.map((header, index) => (
                <Typography
                    key={index}
                    margin={"normal"}
                    color={"black"}
                    variant={header.variant as any}
                    component="div"
                    gutterBottom
                    textAlign={"center"}
                >
                    {header.text}
                </Typography>
            ))}
        </>
    );
}
