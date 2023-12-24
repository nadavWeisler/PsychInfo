import { Fragment } from "react";
import {
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import { styles } from "@/app/[lng]/Components/OrgTagList/OrgTagList.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { OrgtagListProps } from "@/app/[lng]/general/interfaces";
import OrgTagListText from "@/app/[lng]/Components/OrgTagListText";

export default function OrgTagList({
    handleToggle,
    data,
    checked,
}: OrgtagListProps) {
    const { t, direction } = useTrans();
    return (
        <List dir={direction} sx={styles.list}>
            {data.length === 0 ? (
                <ListItem disablePadding>
                    <ListItemText
                        primary={t(LocalizationKeys.Admin.EmptyList)}
                    />
                </ListItem>
            ) : null}
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
                                        checked={checked.indexOf(index) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            "aria-labelledby": labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <OrgTagListText
                                    labelId={labelId}
                                    value={value}
                                />
                            </ListItemButton>
                        </ListItem>
                        <Divider component="li" />
                    </Fragment>
                );
            })}
        </List>
    );
}
