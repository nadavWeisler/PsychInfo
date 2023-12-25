import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { aboutUsTexts } from "@/app/[lng]/general/resources";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { Typography } from "@mui/material";
import { styles } from "@/app/[lng]/Components/AboutUsTexts/AboutUsTexts.style";

export default function AboutUsTexts() {
    const { t } = useTrans();
    return (
        <>
            <Typography
                margin={"normal"}
                variant="h4"
                gutterBottom
                textAlign={"center"}
            >
                {t(LocalizationKeys.AboutUs.Title)}
            </Typography>
            {aboutUsTexts.map((text, index) => (
                <Typography
                    key={index}
                    variant="h6"
                    align="center"
                    sx={styles.text}
                    color="text.primar"
                    paragraph
                >
                    {text}
                </Typography>
            ))}
        </>
    );
}
