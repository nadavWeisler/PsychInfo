"use client";
import { useState, Fragment, useEffect } from "react";
import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tag, Organization } from "@/app/[lng]/general/interfaces";
import { getAllTags, getAllOrganizations } from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { deleteTags, deleteOrganization } from "@/app/[lng]/firebase/commands";
import { PopUpListProps } from "@/app/[lng]/general/interfaces";
import { useAppSelector } from "@/app/[lng]/hooks/redux";
import { RootState } from "@/store";

export default function PopUpList({
    open,
    handleClose,
    dataType,
    title,
    isDeleteHandler,
    isDelete,
}: PopUpListProps) {
    const [checked, setChecked] = useState<number[]>([]);

    const { t, i18n, direction } = useTrans();

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
        <Fragment>
            <Dialog onClose={handleClose} open={open} dir={direction}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent sx={{ width: "100%" }}>
                    <List
                        dir={direction}
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                        }}
                    >
                        {data.length === 0 && (
                            <ListItem disablePadding>
                                <ListItemText primary={t("admin.empty_list")} />
                            </ListItem>
                        )}
                        {data.map((value, index) => {
                            const labelId = `data-label-${value}`;

                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton
                                        role={undefined}
                                        onClick={handleToggle(index)}
                                        dense
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={
                                                    checked.indexOf(index) !==
                                                    -1
                                                }
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{
                                                    "aria-labelledby": labelId,
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            id={labelId}
                                            primary={`id: ${value.id} 
                                        display ${value.display}
                                        name ${value.used}`
                                                .split("\n")
                                                .map((str, index) => (
                                                    <Fragment key={index}>
                                                        {str}
                                                        <br />
                                                    </Fragment>
                                                ))}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                    <IconButton onClick={handleDelete} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        {t("common.close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
