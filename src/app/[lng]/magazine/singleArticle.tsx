"use client";
import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { Typography, Box, Chip, Link, Grid, Paper, Card, CardContent, IconButton, CardActions } from "@mui/material";
import ShareDialog from "@/app/[lng]/Components/ResultComp/ShareDialog";
import useTrans from "@/app/[lng]/hooks/useTrans";
import EditContentDialog from "@/app/[lng]/Components/AdminComp/EditContentDialog";
import { Content } from "@/app/[lng]/general/interfaces";
import { ifValidLink, isEmptyOrSpaces } from "@/app/[lng]/general/utils";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { Delete, Edit, Share } from "@mui/icons-material";
import { auth } from "../firebase/app";
import { deleteContent, getFiles } from "../firebase/commands";

export interface SingleArticleProps {
    article: Content;
}

export default function SingleArticle({ article }: SingleArticleProps) {
    const [openShare, setOpenShare] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const { t, direction } = useTrans();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (article?.isFile) {
          getFiles(article?.title).then((file) => {
            setFileUrl(file);
          });
        }
      }, [article?.isFile]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!!user) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        });
    }, [user]);

    const deleteSelectedContent = async () => {
        await deleteContent(article?.id);
        window.location.reload();
    }

    return (
        <Paper elevation={3}>
            <Card>
                <CardContent>
                    <Box dir={direction}>
                        <Box dir={direction}>
                            <Typography
                                data-testid="title"
                                component={"div"}
                                dir={direction}
                                variant="h5"
                            >
                                {article?.title}
                            </Typography>
                            <Typography
                                data-testid="description-title"
                                component={"div"}
                                dir={direction}
                                variant="h6"
                            >
                                {article?.description}
                            </Typography>
                        </Box>
                        {
                            !isEmptyOrSpaces(article?.link) &&
                            ifValidLink(article?.link) && (
                                <Box component={"div"} dir={direction}>
                                    <Link
                                        data-testid="link"
                                        dir={direction}
                                        margin={"15px"}
                                        href={article?.link}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {t(LocalizationKeys.Common.LinkTitle)}
                                    </Link>
                                </Box>
                            )}
                        <Box component={"div"} marginTop="5px" dir={direction}  >
                            {article?.tags?.map((tag) => (
                                <Chip
                                    key={tag.id}
                                    label={tag.display}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                        {article.isFile ? (
                            <Box component={"div"} dir={direction}>
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
                </CardContent>
                {

                    <CardActions>
                        <IconButton onClick={() => setOpenShare(true)}>
                            <Share />
                        </IconButton>
                        {
                            isAdmin &&
                            <>
                                <IconButton onClick={deleteSelectedContent}>
                                    <Delete />
                                </IconButton>
                                <IconButton
                                    onClick={() => setOpenEdit(true)}
                                >
                                    <Edit />
                                </IconButton>
                            </>
                        }
                    </CardActions>
                }
            </Card>

            <ShareDialog
                open={openShare}
                onClose={() => setOpenShare(false)}
                urlToShare={article?.link}
            />

            <EditContentDialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                prevContent={article}
            />
        </Paper>
    );
}
