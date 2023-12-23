import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { AddStringProps } from "@/app/[lng]/general/interfaces";
import { ReactElement } from "react";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/AddString/AddString.style";
import AddStringDialogContent from "@/app/[lng]/Components/AddStringDialogContent";
import AddStringDialogAction from "@/app/[lng]/Components/AddStringDialogAction";

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
                <AddStringDialogContent
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                />
            </DialogContent>
            <DialogActions>
                <AddStringDialogAction
                    onClose={onClose}
                    handleCreate={handleCreate}
                />
            </DialogActions>
        </Dialog>
    );
}
