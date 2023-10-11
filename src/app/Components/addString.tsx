import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { StringObject } from "../general/interfaces";
import { useTranslation } from "react-i18next";

interface AddStringProps {
    title: string;
    openDialog: boolean;
    handleCloseDialog: () => void;
    handleCreate: () => void;
    inputValue: StringObject;
    setInputValue: (value: StringObject) => void;
}

export const AddString = (props: AddStringProps) => {
    const { t } = useTranslation();

    const { title, openDialog, handleCloseDialog, handleCreate, inputValue, setInputValue } = props;
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    fullWidth
                    label={t("add_string.enter_id")}
                    variant="outlined"
                    value={inputValue.id}
                    onChange={(e) => setInputValue({ ...inputValue, id: e.target.value })}
                />
                <TextField
                    margin="dense"
                    fullWidth
                    label={t("add_string.enter_display")}
                    variant="outlined"
                    value={inputValue.display}
                    onChange={(e) => setInputValue({ ...inputValue, display: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary" sx={{ margin: '10px' }}>
                    {t("common.cancel")}
                </Button>
                <Button onClick={handleCreate} color="primary" sx={{ margin: '10px' }}>
                    {t("common.create")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}