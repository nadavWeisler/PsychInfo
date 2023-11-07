"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PopUpList from "@/app/[lng]/Components/AdminComp/PopUpList";
import { Button, Box } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { ControlPanelProps } from "@/app/[lng]/general/interfaces";
import { styles } from "@/app/[lng]/Components/AdminComp/ControlPanel.style";

export default function ControlPanel({
    isDeleteHandler,
    isDelete,
}: ControlPanelProps) {
    const [openTags, setOpenTags] = useState(false);
    const [openOrganization, setOpenOrganization] = useState(false);

    const router = useRouter();
    const { t, i18n } = useTrans();

    return (
        <Box sx={styles.root}>
            <PopUpList
                open={openTags}
                handleClose={() => setOpenTags(false)}
                dataType="tags"
                title={t("common.tags")}
                isDeleteHandler={isDeleteHandler}
                isDelete={isDelete}
            />
            <PopUpList
                open={openOrganization}
                handleClose={() => setOpenOrganization(false)}
                dataType="organizations"
                title={t("common.organizations")}
                isDeleteHandler={isDeleteHandler}
                isDelete={isDelete}
            />
            <Box sx={styles.secondary}>
                <Button
                    sx={styles.button}
                    variant={"contained"}
                    onClick={() => setOpenTags(true)}
                >
                    {t("admin.open_tags")}
                </Button>
                <Button
                    sx={styles.button}
                    variant={"contained"}
                    onClick={() => setOpenOrganization(true)}
                >
                    {t("admin.open_organizations")}
                </Button>
                <Button
                    sx={styles.button}
                    variant={"contained"}
                    onClick={() =>
                        router.replace(`/${i18n.language}/therapists-info`)
                    }
                >
                    {t("admin.move_therapists")}
                </Button>
            </Box>
        </Box>
    );
}
