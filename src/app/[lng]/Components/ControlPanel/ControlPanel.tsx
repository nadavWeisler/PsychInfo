"use client";
import { useState } from "react";
import PopUpList from "@/app/[lng]/Components/PopUpList";
import { Button, Box } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { ControlPanelProps, dataType } from "@/app/[lng]/general/interfaces";
import { styles } from "@/app/[lng]/Components/ControlPanel/ControlPanel.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function ControlPanel({
    isDeleteHandler,
    isDelete,
}: ControlPanelProps) {
    const [openTags, setOpenTags] = useState<boolean>(false);
    const [openOrganization, setOpenOrganization] = useState<boolean>(false);

    const { t } = useTrans();

    const popupsArray = [
        {
            open: openTags,
            onClose: () => setOpenTags(false),
            dataType: "tags" as dataType,
            title: t(LocalizationKeys.Common.Tags),
        },
        {
            open: openOrganization,
            onClose: () => setOpenOrganization(false),
            dataType: "organizations" as dataType,
            title: t(LocalizationKeys.Common.Organizations),
        },
    ];

    const buttonsArray = [
        {
            onClick: () => setOpenTags(true),
            text: t(LocalizationKeys.Admin.OpenTags),
        },
        {
            onClick: () => setOpenOrganization(true),
            text: t(LocalizationKeys.Admin.OpenOrganizations),
        },
    ];

    return (
        <>
            {popupsArray.map((popup, index) => (
                <PopUpList
                    key={index}
                    open={popup.open}
                    onClose={popup.onClose}
                    dataType={popup.dataType}
                    title={popup.title}
                    isDeleteHandler={isDeleteHandler}
                    isDelete={isDelete}
                />
            ))}
            <Box>
                {buttonsArray.map((button, index) => (
                    <Button
                        key={index}
                        sx={styles.button}
                        variant={"contained"}
                        onClick={button.onClick}
                    >
                        {button.text}
                    </Button>
                ))}
            </Box>
        </>
    );
}
