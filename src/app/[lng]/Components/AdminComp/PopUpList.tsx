"use client";
import { useState, Fragment } from "react";
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
    Divider,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tag, Organization } from "@/app/[lng]/general/interfaces";
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
}: PopUpListProps) {
    const { t, direction } = useTrans();
    const [checked, setChecked] = useState<number[]>([]);

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
        <Dialog onClose={handleClose} open={open} dir={direction} sx={{ zIndex: 3000 }}>
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
                            <Fragment key={index}>
                                <ListItem  disablePadding sx={{ border: "black" }}>
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
                                            primary={
                                                <Fragment>
                                                    <Typography sx={{ fontWeight: 'bold' }}>
                                                        ID: <Typography component={"span"}>
                                                            {value.id}
                                                        </Typography>
                                                    </Typography>
                                                    <Typography sx={{ fontWeight: 'bold' }}>
                                                        Display: <Typography component={"span"}>
                                                            {value.display}
                                                        </Typography>
                                                    </Typography>
                                                    <Typography sx={{ fontWeight: 'bold' }}>
                                                        Used: <Typography component={"span"}>
                                                            {value.used ? "True" : "False"}
                                                        </Typography>
                                                    </Typography>
                                                </Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <Divider component="li" />
                            </Fragment>


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
    );
}
