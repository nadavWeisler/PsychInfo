import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import {
    DisplayLanguages,
    UploadLanguageProps,
} from "@/app/[lng]/general/interfaces";
import { getSelectStyles } from "@/app/[lng]/general/utils";
import { appTheme } from "@/app/[lng]/general/styles";
import { styles } from "@/app/[lng]/Components/UploadLanguage/UploadLanguage.style";

export default function UploadLanguage({
    selectedLanguage,
    selectedLanguageHandler,
}: UploadLanguageProps) {
    const { t } = useTrans();

    return (
        <FormControl
            key={LocalizationKeys.Common.Language}
            margin="normal"
            fullWidth
            required
        >
            <FormLabel>{t(LocalizationKeys.Common.Language)}</FormLabel>
            <Select
                sx={styles.select}
                color={"secondary"}
                value={selectedLanguage}
                onChange={(e) =>
                    selectedLanguageHandler(e.target.value as string)
                }
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
