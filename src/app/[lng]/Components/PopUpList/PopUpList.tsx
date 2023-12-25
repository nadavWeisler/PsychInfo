"use client";
import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@mui/material";
import {
    Tag,
    Organization,
    PopUpListProps,
} from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { useAppSelector } from "@/app/[lng]/hooks/redux";
import { RootState } from "@/store";
import { styles } from "@/app/[lng]/Components/PopUpList/PopUpList.style";
import OrgTagList from "@/app/[lng]/Components/OrgTagList";
import AddDialog from "@/app/[lng]/Components/AddDialog";
import OrgTagListActions from "@/app/[lng]/Components/OrgTagListActions";

export default function PopUpList({
    open,
    onClose,
    dataType,
    title,
    isDeleteHandler,
}: PopUpListProps) {
    const [checked, setChecked] = useState<number[]>([]);
    const [openAddTagDialog, setOpenAddTagDialog] = useState<boolean>(false);
    const [openAddOrgDialog, setOpenAddOrgDialog] = useState<boolean>(false);

    const { direction } = useTrans();

    const data: Tag[] | Organization[] =
        dataType === "tags"
            ? (useAppSelector(
                  (state: RootState) => state.tagsAndOrg.tags
              ) as Tag[])
            : (useAppSelector(
                  (state: RootState) => state.tagsAndOrg.organizations
              ) as Organization[]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Dialog onClose={onClose} open={open} dir={direction} sx={styles.root}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent sx={styles.content}>
                <OrgTagList
                    data={data}
                    checked={checked}
                    handleToggle={handleToggle}
                />
                <AddDialog
                    dataType={dataType}
                    openAddTagDialog={openAddTagDialog}
                    openAddOrgDialog={openAddOrgDialog}
                    setOpenAddTagDialog={setOpenAddTagDialog}
                    setOpenAddOrgDialog={setOpenAddOrgDialog}
                />
            </DialogContent>
            <DialogActions>
                <OrgTagListActions
                    isDeleteHandler={isDeleteHandler}
                    data={data}
                    checked={checked}
                    dataType={dataType}
                    setOpenAddTagDialog={setOpenAddTagDialog}
                    setOpenAddOrgDialog={setOpenAddOrgDialog}
                    onClose={onClose}
                />
            </DialogActions>
        </Dialog>
    );
}
