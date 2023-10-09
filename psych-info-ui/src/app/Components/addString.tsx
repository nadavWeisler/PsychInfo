import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Texts } from "../resources/texts";
import { StringObject } from "../general/interfaces";

interface AddStringProps {
    title: string;
    openDialog: boolean;
    handleCloseDialog: () => void;
    handleCreate: () => void;
    inputValue: StringObject;
    setInputValue: (value: StringObject) => void;
}

export const AddString = (props: AddStringProps) => {
    const { title, openDialog, handleCloseDialog, handleCreate, inputValue, setInputValue } = props;
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label={Texts.ADD_STRING.EnterID}
                    variant="outlined"
                    value={inputValue.id}
                    onChange={(e) => setInputValue({ ...inputValue, id: e.target.value })}
                />
                <TextField
                    fullWidth
                    label={Texts.ADD_STRING.EnterDisplayName}
                    variant="outlined"
                    value={inputValue.display}
                    onChange={(e) => setInputValue({ ...inputValue, display: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    {Texts.COMMON.Cancel}
                </Button>
                <Button onClick={handleCreate} color="primary">
                    {Texts.COMMON.Create}
                </Button>
            </DialogActions>
        </Dialog>
    );
}