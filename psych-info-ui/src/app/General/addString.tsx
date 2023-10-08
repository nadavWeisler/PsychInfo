import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Texts } from "../resources/texts";

interface AddStringProps {
    title: string;
    question: string;
    openDialog: boolean;
    handleCloseDialog: () => void;
    handleCreate: () => void;
    inputValue: string;
    setInputValue: (value: string) => void;
}

export const AddString = (props: AddStringProps) => {
    const { title, question, openDialog, handleCloseDialog, handleCreate, inputValue, setInputValue } = props;
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label={question}
                    variant="outlined"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
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