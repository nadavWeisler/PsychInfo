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
import { DisplayLanguages, Organization, Tag } from "../general/interfaces";
import { useTranslation } from "react-i18next";

interface AddStringProps {
    title: string;
    openDialog: boolean;
    handleCloseDialog: () => void;
    handleCreate: () => void;
    inputValue: Tag | Organization;
    setInputValue: (value: Tag | Organization) => void;
}

export const AddString = (props: AddStringProps) => {
    const { t } = useTranslation();
    const {
        title,
        openDialog,
        handleCloseDialog,
        handleCreate,
        inputValue,
        setInputValue,
    } = props;

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    margin="dense"
                    fullWidth
                    label={t("add_string.enter_id")}
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
                    label={t("add_string.enter_display")}
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
                    <InputLabel>{t("add_string.enter_language")}</InputLabel>
                    <Select
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
                    sx={{ margin: "10px" }}
                >
                    {t("common.cancel")}
                </Button>
                <Button
                    onClick={handleCreate}
                    color="primary"
                    sx={{ margin: "10px" }}
                >
                    {t("common.create")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};