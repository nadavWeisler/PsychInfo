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
    Organization,
    Tag,
} from "@/app/[lng]/general/interfaces";
import { ReactElement } from "react";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/addString.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

interface AddStringProps {
    title: string;
    openDialog: boolean;
    handleCloseDialog: () => void;
    handleCreate: () => void;
    inputValue: Tag | Organization;
    setInputValue: (value: Tag | Organization) => void;
}

export const AddString = ({
    title,
    openDialog,
    handleCloseDialog,
    handleCreate,
    inputValue,
    setInputValue,
}: AddStringProps): ReactElement => {
    const { t } = useTrans();

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} sx={styles.root}>
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
                    <InputLabel>{t(LocalizationKeys.AddString.EnterLanguage)}</InputLabel>
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
                    onClick={handleCloseDialog}
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
};
