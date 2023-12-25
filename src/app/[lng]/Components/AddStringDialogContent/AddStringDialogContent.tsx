import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { DisplayLanguages } from "@/app/[lng]/general/interfaces";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { AddStringDialogContentProps } from "@/app/[lng]/general/interfaces";
import { styles } from "@/app/[lng]/Components/AddStringDialogContent/AddStringDialogContent.style";

export default function AddStringDialogContent({
    setInputValue,
    inputValue,
}: AddStringDialogContentProps) {
    const { t } = useTrans();
    return (
        <>
            <TextField
                required
                margin="dense"
                fullWidth
                label={t(LocalizationKeys.AddString.EnterId)}
                variant="outlined"
                value={inputValue.id}
                onChange={(e) =>
                    setInputValue({ ...inputValue, id: e.target.value })
                }
            />
            <TextField
                required
                margin="dense"
                fullWidth
                label={t(LocalizationKeys.AddString.EnterDisplay)}
                variant="outlined"
                value={inputValue.display}
                onChange={(e) =>
                    setInputValue({ ...inputValue, display: e.target.value })
                }
            />
            <FormControl margin="dense" fullWidth required>
                <InputLabel>
                    {t(LocalizationKeys.AddString.EnterLanguage)}
                </InputLabel>
                <Select
                    MenuProps={{
                        style: styles.selectMenu,
                    }}
                    variant="outlined"
                    value={
                        DisplayLanguages[
                            inputValue.languageId as keyof typeof DisplayLanguages
                        ]
                    }
                    onChange={(e) =>
                        setInputValue({
                            ...inputValue,
                            languageId: e.target.value,
                        })
                    }
                >
                    {Object.keys(DisplayLanguages).map((lang) => (
                        <MenuItem key={lang} value={lang}>
                            {
                                DisplayLanguages[
                                    lang as keyof typeof DisplayLanguages
                                ]
                            }
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}
