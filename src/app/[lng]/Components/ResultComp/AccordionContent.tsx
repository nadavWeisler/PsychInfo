"use client";
import React, { useState, useEffect, useContext, Fragment, use } from "react";
import { Typography, Box, Chip, Link, Grid, Button } from "@mui/material";
import ShareDialog from "@/app/[lng]/Components/ResultComp/ShareDialog";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { deleteContent } from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";
import EditContentDialog from "@/app/[lng]/Components/AdminComp/EditContentDialog";
import {
    AccordionContentProps,
    DisplayLanguages,
} from "@/app/[lng]/general/interfaces";
import { ifValidLink, isEmptyOrSpaces } from "@/app/[lng]/general/utils";
import { styles } from "@/app/[lng]/Components/ResultComp/AccordionContent.style";

export default function AccordionContent({
    data,
    request,
    deleteRequest,
    aproveRequest,
}: AccordionContentProps) {
    const [openShare, setOpenShare] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const { t, direction } = useTrans();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!!user) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        });
    }, [user]);

    const deleteSelectedContent = () => {
        deleteContent(data?.id);
    };

    useEffect(() => {
        if (data === undefined) {
            setIsDeleted(true);
        } else {
            setIsDeleted(false);
        }
    }, [data]);

    const btnDirrection = direction === "rtl" ? "ltr" : "rtl";
    const requestBtnDirrection = request ? btnDirrection : undefined;

    return (
        <>
            {!isDeleted ? (
                <div>
                    <Box component={"div"} dir={direction} sx={styles.root}>
                        <Box component={"div"} dir={direction} sx={styles.box}>
                            <Typography
                                component={"div"}
                                dir={direction}
                                sx={styles.typ}
                                variant="h6"
                            >
                                {t("common.description")}:
                            </Typography>
                            <Box sx={styles.boxSecondary} component={"div"}>
                                <Typography
                                    component={"div"}
                                    dir={direction}
                                    sx={styles.typ}
                                    variant="h6"
                                >
                                    {data?.description}
                                </Typography>
                            </Box>
                        </Box>
                        {!isEmptyOrSpaces(data?.link) &&
                            ifValidLink(data?.link) && (
                                <Box
                                    component={"div"}
                                    dir={direction}
                                    sx={styles.box}
                                >
                                    <Typography
                                        component={"div"}
                                        dir={direction}
                                        sx={styles.typ}
                                        variant="h6"
                                    >
                                        {t("common.link")}:
                                    </Typography>
                                    <Link
                                        dir={direction}
                                        margin={"15px"}
                                        href={data?.link}
                                        target="_blank"
                                        rel="noopener"
                                        sx={styles.link}
                                    >
                                        {t("common.link_title")}
                                    </Link>
                                </Box>
                            )}
                        <Box component={"div"} dir={direction} sx={styles.box}>
                            <Typography
                                component={"div"}
                                dir={direction}
                                sx={styles.typ}
                                variant="h6"
                            >
                                {t("common.organization")}:&nbsp;
                            </Typography>
                            {[data?.organization]?.map((org) => (
                                <Chip
                                    sx={styles.chip}
                                    key={org?.id}
                                    label={org?.display}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                        <Box component={"div"} dir={direction} sx={styles.box}>
                            <Typography
                                component={"div"}
                                dir={direction}
                                sx={styles.typ}
                                variant="h6"
                            >
                                {t("common.language")}:
                            </Typography>
                            {[data?.languageId]?.map((lang) => (
                                <Chip
                                    sx={styles.chip}
                                    key={lang}
                                    label={
                                        DisplayLanguages[
                                            lang as keyof typeof DisplayLanguages
                                        ]
                                    }
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                        <Box component={"div"} dir={direction} sx={styles.box}>
                            <Typography
                                component={"div"}
                                dir={direction}
                                sx={styles.typ}
                                variant="h6"
                            >
                                {t("common.tags")}:
                            </Typography>
                            <Grid container spacing={4} marginTop={"10px"}>
                                {data?.tags?.map((tag) => (
                                    <Chip
                                        sx={styles.chipSecondary}
                                        key={tag.id}
                                        label={tag.display}
                                        variant="outlined"
                                    />
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                    <Box
                        component={"div"}
                        sx={styles.box}
                        dir={requestBtnDirrection}
                    >
                        {!request ? (
                            <Button
                                sx={styles.button}
                                color={"success"}
                                variant={"contained"}
                                onClick={() => setOpenShare(true)}
                            >
                                {t("common.share")}
                            </Button>
                        ) : null}
                        {isAdmin ? (
                            request ? (
                                <Box component={"div"} sx={styles.box}>
                                    <Button
                                        sx={styles.buttonSecondary}
                                        color={"error"}
                                        variant={"contained"}
                                        onClick={deleteRequest}
                                    >
                                        {t("common.delete")}
                                    </Button>
                                    <Button
                                        color={"success"}
                                        variant={"contained"}
                                        onClick={aproveRequest}
                                    >
                                        {t("common.submit")}
                                    </Button>
                                </Box>
                            ) : (
                                <>
                                    <Box
                                        component={"div"}
                                        dir={direction}
                                        sx={styles.box}
                                    >
                                        <Box component={"div"} sx={styles.box}>
                                            <Button
                                                sx={{ margin: "auto" }}
                                                color={"success"}
                                                variant={"contained"}
                                                onClick={() =>
                                                    setOpenEdit(true)
                                                }
                                            >
                                                {t("common.edit")}
                                            </Button>
                                        </Box>
                                        <Box component={"div"} sx={styles.box}>
                                            <Button
                                                sx={{ margin: "auto" }}
                                                color={"error"}
                                                variant={"contained"}
                                                onClick={deleteSelectedContent}
                                            >
                                                {t("common.delete")}
                                            </Button>
                                        </Box>
                                    </Box>
                                </>
                            )
                        ) : null}
                    </Box>

                    <ShareDialog
                        open={openShare}
                        onClose={() => setOpenShare(false)}
                        urlToShare={data?.link}
                    />
                    <EditContentDialog
                        open={openEdit}
                        onClose={() => setOpenEdit(false)}
                        prevContent={data}
                    />
                </div>
            ) : (
                <Typography component={"div"}>
                    {t("admin.no_content")}
                </Typography>
            )}
        </>
    );
}
