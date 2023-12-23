import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import {
    DisplayLanguages,
    AddStringProps,
} from "@/app/[lng]/general/interfaces";
import { ReactElement } from "react";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/AddString/AddString.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function AddString({
    title,
    open,
    onClose,
    handleCreate,
    inputValue,
    setInputValue,
}: AddStringProps): ReactElement {
    const { t } = useTrans();

    return (
        <Dialog open={open} onClose={onClose} sx={styles.root}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
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
                        setInputValue({
                            ...inputValue,
                            display: e.target.value,
                        })
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
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="primary"
                    sx={styles.button}
                >
                    {t(LocalizationKeys.Common.Cancel)}
                </Button>
                <Button
                    onClick={handleCreate}
                    color="primary"
                    sx={styles.button}
                >
                    {t(LocalizationKeys.Common.Create)}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
