import { deleteTags, deleteOrganization } from "@/app/[lng]/firebase/commands";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { OrgTagListActionsProps } from "@/app/[lng]/general/interfaces";

export default function OrgTagListActions({
    dataType,
    data,
    isDeleteHandler,
    checked,
    setOpenAddTagDialog,
    setOpenAddOrgDialog,
    onClose,
}: OrgTagListActionsProps) {
    const { t } = useTrans();
    const handleDelete = () => {
        const deleteData =
            dataType === "tags" ? deleteTags : deleteOrganization;
        checked.forEach((index) => {
            const id = data[index].id;
            deleteData(id);
        });
        isDeleteHandler();
    };
    return (
        <>
            <IconButton onClick={handleDelete} aria-label="delete">
                <DeleteIcon />
            </IconButton>
            <IconButton
                onClick={
                    dataType === "tags"
                        ? () => setOpenAddTagDialog(true)
                        : () => setOpenAddOrgDialog(true)
                }
                aria-label="add"
            >
                <AddIcon />
            </IconButton>
            <Button autoFocus onClick={onClose}>
                {t(LocalizationKeys.Common.Close)}
            </Button>
        </>
    );
}
