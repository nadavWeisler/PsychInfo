import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import {
    ContentSelectLangProps,
    DisplayLanguages,
} from "@/app/[lng]/general/interfaces";
import { appTheme } from "@/app/[lng]/general/styles";

export default function ContentSelectLang({
    prevContent,
    selectedLanguage,
    setSelectedLanguage,
    getSelectStyles,
}: ContentSelectLangProps) {
    const { t } = useTrans();
    return (
        <FormControl margin="normal" fullWidth required>
            <InputLabel>{t(LocalizationKeys.Common.Language)}</InputLabel>
            <Select
                defaultValue={prevContent.languageId}
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
    );
}
