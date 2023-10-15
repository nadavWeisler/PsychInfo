"use client";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import EditContentForm from "@/app/[lng]/Components/AdminComp/EditContentForm";
import { EditContentDialogProps } from "@/app/[lng]/general/interfaces";

export default function EditContentDialog({
    open,
    onClose,
    prevContent,
}: EditContentDialogProps) {
    const { t } = useTrans();
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t("edit.title")}</DialogTitle>
            <DialogContent>
                <EditContentForm prevContent={prevContent} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t("common.close")}</Button>
            </DialogActions>
        </Dialog>
    );
}
