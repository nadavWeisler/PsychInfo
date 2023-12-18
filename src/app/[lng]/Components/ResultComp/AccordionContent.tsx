"use client";
import React, { useState, useEffect, useContext } from "react";
import { Typography, Box, Chip, Link, Grid, Button } from "@mui/material";
import ShareDialog from "@/app/[lng]/Components/ResultComp/ShareDialog";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { deleteContent, getFiles } from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";
import EditContentDialog from "@/app/[lng]/Components/AdminComp/EditContentDialog";
import {
    AccordionContentProps,
    DisplayLanguages,
} from "@/app/[lng]/general/interfaces";
import { ifValidLink, isEmptyOrSpaces } from "@/app/[lng]/general/utils";
import { styles } from "@/app/[lng]/Components/ResultComp/AccordionContent.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

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
    const [fileUrl, setFileUrl] = useState<string | null>(null);

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

    useEffect(() => {
        if (data?.isFile) {
            getFiles(data?.title).then((file) => {
                setFileUrl(file);
            });
        }
    }, [data?.isFile]);

    const btnDirrection = direction === "rtl" ? "ltr" : "rtl";
    const requestBtnDirrection = request ? btnDirrection : undefined;

    return (
        <>
            {!isDeleted ? (
                <div>
                    <Box component={"div"} dir={direction} sx={styles.root}>
                        <Box component={"div"} dir={direction} sx={styles.box}>
                            <Typography
                                data-testid="description-title"
                                component={"div"}
                                dir={direction}
                                sx={styles.typ}
                                variant="h6"
                            >
                                {t(LocalizationKeys.Common.Description)}:
                            </Typography>
                            <Box sx={styles.boxSecondary} component={"div"}>
                                <Typography
                                    data-testid="description"
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
                                        data-testid="link-title"
                                        component={"div"}
                                        dir={direction}
                                        sx={styles.typ}
                                        variant="h6"
                                    >
                                        {t(LocalizationKeys.Common.Link)}:
                                    </Typography>
                                    <Link
                                        data-testid="link"
                                        dir={direction}
                                        margin={"15px"}
                                        href={data?.link}
                                        target="_blank"
                                        rel="noopener"
                                        sx={styles.link}
                                    >
                                        {t(LocalizationKeys.Common.LinkTitle)}
                                    </Link>
                                </Box>
                            )}
                        <Box component={"div"} dir={direction} sx={styles.box}>
                            <Typography
                                data-testid="org-title"
                                component={"div"}
                                dir={direction}
                                sx={styles.typ}
                                variant="h6"
                            >
                                {t(LocalizationKeys.Common.Organization)}:&nbsp;
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
                                data-testid="lang-title"
                                component={"div"}
                                dir={direction}
                                sx={styles.typ}
                                variant="h6"
                            >
                                {t(LocalizationKeys.Common.Language)}:
                            </Typography>
                            {[data?.languageId]?.map((lang, index) => (
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
                                data-testid="tags-title"
                                component={"div"}
                                dir={direction}
                                sx={styles.typ}
                                variant="h6"
                            >
                                {t(LocalizationKeys.Common.Tags)}:
                            </Typography>
                            <Grid container spacing={4} marginTop={"10px"}>
                                {data?.tags?.map((tag, index) => (
                                    <Chip
                                        sx={styles.chipSecondary}
                                        key={tag.id}
                                        label={tag.display}
                                        variant="outlined"
                                    />
                                ))}
                            </Grid>
                        </Box>
                        {data.isFile ? (
                            <Box
                                component={"div"}
                                dir={direction}
                                sx={styles.box}
                            >
                                <img
                                    data-testid="image"
                                    src={fileUrl || ""}
                                    alt={""}
                                    width="20%"
                                    height="20%"
                                />
                            </Box>
                        ) : null}
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
                                {t(LocalizationKeys.Common.Share)}
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
                                        {t(LocalizationKeys.Common.Delete)}
                                    </Button>
                                    <Button
                                        data-testid="submit-btn"
                                        color={"success"}
                                        variant={"contained"}
                                        onClick={aproveRequest}
                                    >
                                        {t(LocalizationKeys.Common.Submit)}
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
                                                data-testid="edit-btn"
                                                sx={{ margin: "auto" }}
                                                color={"success"}
                                                variant={"contained"}
                                                onClick={() =>
                                                    setOpenEdit(true)
                                                }
                                            >
                                                {t(
                                                    LocalizationKeys.Common.Edit
                                                )}
                                            </Button>
                                        </Box>
                                        <Box component={"div"} sx={styles.box}>
                                            <Button
                                                data-testid="delete-content-btn"
                                                sx={{ margin: "auto" }}
                                                color={"error"}
                                                variant={"contained"}
                                                onClick={deleteSelectedContent}
                                            >
                                                {t(
                                                    LocalizationKeys.Common
                                                        .Delete
                                                )}
                                            </Button>
                                        </Box>
                                    </Box>
                                </>
                            )
                        ) : null}
                    </Box>

                    <ShareDialog // TODO: add test
                        open={openShare}
                        onClose={() => setOpenShare(false)}
                        urlToShare={data?.link}
                    />
                    <EditContentDialog // TODO: add test
                        open={openEdit}
                        onClose={() => setOpenEdit(false)}
                        prevContent={data}
                    />
                </div>
            ) : (
                <Typography component={"div"}>
                    {t(LocalizationKeys.Admin.NoContent)}
                </Typography>
            )}
        </>
    );
}
