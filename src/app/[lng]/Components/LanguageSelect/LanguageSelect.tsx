import { Select, MenuItem } from "@mui/material";
import { DisplayLanguages } from "@/app/[lng]/general/interfaces";
import { styles } from "@/app/[lng]/Components/LanguageSelect/LanguageSelect.style";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function LanguageSelect() {
    const { i18n } = useTrans();
    return (
        <Select
            onChange={(e) => i18n.changeLanguage(e.target.value as string)}
            aria-label="change language"
            value={i18n.language || "he"}
            sx={styles.select}
        >
            {Object.keys(DisplayLanguages).map((lang) => (
                <MenuItem key={lang} value={lang}>
                    {DisplayLanguages[lang as keyof typeof DisplayLanguages]}
                </MenuItem>
            ))}
        </Select>
    );
}
