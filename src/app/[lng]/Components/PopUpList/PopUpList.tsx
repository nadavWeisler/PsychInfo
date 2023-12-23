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
import AddIcon from "@mui/icons-material/Add";
import {
    Tag,
    Organization,
    PopUpListProps,
    StringObject,
} from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import {
    deleteTags,
    deleteOrganization,
    createOrganization,
    createTag,
} from "@/app/[lng]/firebase/commands";
import { useAppSelector } from "@/app/[lng]/hooks/redux";
import { RootState } from "@/store";
import { EMPTY_ORGANIZATION, EMPTY_TAG } from "@/app/[lng]/general/utils";
import AddString from "@/app/[lng]/Components/AddString";
import { styles } from "@/app/[lng]/Components/PopUpList/PopUpList.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function PopUpList({
    open,
    onClose,
    dataType,
    title,
    isDeleteHandler,
}: PopUpListProps) {
    const [checked, setChecked] = useState<number[]>([]);
    const [otherOrgValue, setOtherOrgValue] =
        useState<Organization>(EMPTY_ORGANIZATION);
    const [otherTagValue, setOtherTagValue] = useState<Tag>(EMPTY_TAG);

    const [openAddTagDialog, setOpenAddTagDialog] = useState<boolean>(false);
    const [openAddOrgDialog, setOpenAddOrgDialog] = useState<boolean>(false);

    const { t, direction } = useTrans();

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

    async function handleCreateTag(): Promise<void> {
        if (otherTagValue) {
            await createTag(otherTagValue).then(() => {
                setOtherTagValue(EMPTY_TAG);
                setOpenAddTagDialog(false);
            });
        }
    }

    async function handleCreateOrg(): Promise<void> {
        if (otherOrgValue) {
            await createOrganization(otherOrgValue).then(() => {
                setOtherOrgValue(EMPTY_ORGANIZATION);
                setOpenAddOrgDialog(false);
            });
        }
    }

    function setOtherOrganizationInForm(org: StringObject): void {
        setOtherOrgValue({ ...org, used: false });
    }

    function setOtherTagInForm(tag: StringObject): void {
        setOtherTagValue({ ...tag, used: false });
    }

    const AddDialog =
        dataType === "tags" ? (
            <AddString
                onClose={() => setOpenAddTagDialog(false)}
                handleCreate={handleCreateTag}
                inputValue={otherTagValue}
                setInputValue={setOtherTagInForm}
                open={openAddTagDialog}
                title={t(LocalizationKeys.Upload.CreateNewTag)}
            />
        ) : (
            <AddString
                onClose={() => setOpenAddOrgDialog(false)}
                handleCreate={handleCreateOrg}
                inputValue={otherOrgValue}
                setInputValue={setOtherOrganizationInForm}
                open={openAddOrgDialog}
                title={t(LocalizationKeys.Upload.CreateNewOrganization)}
            />
        );

    const openAddDialog =
        dataType === "tags"
            ? () => setOpenAddTagDialog(true)
            : () => setOpenAddOrgDialog(true);

    return (
        <Dialog onClose={onClose} open={open} dir={direction} sx={styles.root}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent sx={styles.content}>
                <List dir={direction} sx={styles.list}>
                    {data.length === 0 && (
                        <ListItem disablePadding>
                            <ListItemText
                                primary={t(LocalizationKeys.Admin.EmptyList)}
                            />
                        </ListItem>
                    )}
                    {data.map((value, index) => {
                        const labelId = `data-label-${value}`;

                        return (
                            <Fragment key={index}>
                                <ListItem disablePadding sx={styles.listItem}>
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
                                                    <Typography sx={styles.typ}>
                                                        ID:
                                                        <Typography
                                                            component={"span"}
                                                        >
                                                            {value.id}
                                                        </Typography>
                                                    </Typography>
                                                    <Typography sx={styles.typ}>
                                                        Display:
                                                        <Typography
                                                            component={"span"}
                                                        >
                                                            {value.display}
                                                        </Typography>
                                                    </Typography>
                                                    <Typography sx={styles.typ}>
                                                        Used:
                                                        <Typography
                                                            component={"span"}
                                                        >
                                                            {value.used
                                                                ? "True"
                                                                : "False"}
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

                {AddDialog}
            </DialogContent>
            <DialogActions>
                <IconButton onClick={handleDelete} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={openAddDialog} aria-label="add">
                    <AddIcon />
                </IconButton>
                <Button autoFocus onClick={onClose}>
                    {t(LocalizationKeys.Common.Close)}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
