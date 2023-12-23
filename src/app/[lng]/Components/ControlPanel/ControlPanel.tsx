"use client";
import { useState } from "react";
import PopUpList from "@/app/[lng]/Components/PopUpList";
import { Button, Box } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { ControlPanelProps } from "@/app/[lng]/general/interfaces";
import { styles } from "@/app/[lng]/Components/ControlPanel/ControlPanel.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function ControlPanel({
    isDeleteHandler,
    isDelete,
}: ControlPanelProps) {
    const [openTags, setOpenTags] = useState<boolean>(false);
    const [openOrganization, setOpenOrganization] = useState<boolean>(false);

    const { t } = useTrans();

    return (
        <>
            <PopUpList
                open={openTags}
                onClose={() => setOpenTags(false)}
                dataType="tags"
                title={t(LocalizationKeys.Common.Tags)}
                isDeleteHandler={isDeleteHandler}
                isDelete={isDelete}
            />
            <PopUpList
                open={openOrganization}
                onClose={() => setOpenOrganization(false)}
                dataType="organizations"
                title={t(LocalizationKeys.Common.Organizations)}
                isDeleteHandler={isDeleteHandler}
                isDelete={isDelete}
            />
            <Box>
                <Button
                    sx={styles.button}
                    variant={"contained"}
                    onClick={() => setOpenTags(true)}
                >
                    {t(LocalizationKeys.Admin.OpenTags)}
                </Button>
                <Button
                    sx={styles.button}
                    variant={"contained"}
                    onClick={() => setOpenOrganization(true)}
                >
                    {t(LocalizationKeys.Admin.OpenOrganizations)}
                </Button>
            </Box>
        </>
    );
}
