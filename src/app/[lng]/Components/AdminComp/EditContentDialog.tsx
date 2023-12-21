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
import { styles } from "@/app/[lng]/Components/AdminComp/EditContentDialog.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function EditContentDialog({
  open,
  onClose,
  prevContent,
}: EditContentDialogProps) {
  const { t } = useTrans();
  return (
    <Dialog open={open} onClose={onClose} sx={styles.root}>
      <DialogTitle>{t(LocalizationKeys.Admin.EditTitle)}</DialogTitle>
      <DialogContent>
        <EditContentForm prevContent={prevContent} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t(LocalizationKeys.Common.Close)}</Button>
      </DialogActions>
    </Dialog>
  );
}
