"use client";
import React, { useState, useEffect, useContext } from "react";
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
                    <Box
                        component={"div"}
                        dir={direction}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            overflow: "auto",
                        }}
                    >
                        <Box
                            component={"div"}
                            dir={direction}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Typography
                                data-testid="description-title"
                                component={"div"}
                                dir={direction}
                                sx={{ margin: "10px" }}
                                variant="h6"
                            >
                                {t("common.description")}:
                            </Typography>
                            <Box
                                sx={{ whiteSpace: "pre-wrap" }}
                                component={"div"}
                            >
                                <Typography
                                    data-testid="description"
                                    component={"div"}
                                    dir={direction}
                                    sx={{ margin: "10px" }}
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
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Typography
                                        data-testid="link-title"
                                        component={"div"}
                                        dir={direction}
                                        sx={{ margin: "10px" }}
                                        variant="h6"
                                    >
                                        {t("common.link")}:
                                    </Typography>
                                    <Link
                                        data-testid="link"
                                        dir={direction}
                                        margin={"15px"}
                                        href={data?.link}
                                        target="_blank"
                                        rel="noopener"
                                        sx={{
                                            color: "blue",
                                            textDecoration: "underline",
                                        }}
                                    >
                                        {t("common.link_title")}
                                    </Link>
                                </Box>
                            )}
                        <Box
                            component={"div"}
                            dir={direction}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Typography
                                data-testid="org-title"
                                component={"div"}
                                dir={direction}
                                sx={{ margin: "10px" }}
                                variant="h6"
                            >
                                {t("common.organization")}:&nbsp;
                            </Typography>
                            {[data?.organization]?.map((org) => (
                                <Chip
                                    data-testid="org"
                                    sx={{ margin: "10px" }}
                                    key={org?.id}
                                    label={org?.display}
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                        <Box
                            component={"div"}
                            dir={direction}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Typography
                                data-testid="lang-title"
                                component={"div"}
                                dir={direction}
                                sx={{ margin: "10px" }}
                                variant="h6"
                            >
                                {t("common.language")}:
                            </Typography>
                            {[data?.languageId]?.map((lang, index) => (
                                <Chip
                                    data-testid={`lang-${index}`}
                                    sx={{ margin: "10px" }}
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
                        <Box
                            component={"div"}
                            dir={direction}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Typography
                                data-testid="tags-title"
                                component={"div"}
                                dir={direction}
                                sx={{ margin: "10px" }}
                                variant="h6"
                            >
                                {t("common.tags")}:
                            </Typography>
                            <Grid container spacing={4} marginTop={"10px"}>
                                {data?.tags?.map((tag, index) => (
                                    <Chip
                                        data-testid={`tags-${index}`}
                                        sx={{
                                            marginRight: "5px",
                                            marginTop: "3px",
                                        }}
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
                        sx={{ display: "flex", direction: "row" }}
                        dir={requestBtnDirrection}
                    >
                        {!request ? (
                            <Button
                                data-testid="share-btn"
                                sx={{ margin: "auto" }}
                                color={"success"}
                                variant={"contained"}
                                onClick={() => setOpenShare(true)}
                            >
                                {t("common.share")}
                            </Button>
                        ) : null}
                        {isAdmin ? (
                            request ? (
                                <Box
                                    component={"div"}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Button
                                        data-testid="delete-request-btn"
                                        sx={{ marginLeft: "20px" }}
                                        color={"error"}
                                        variant={"contained"}
                                        onClick={deleteRequest}
                                    >
                                        {t("common.delete")}
                                    </Button>
                                    <Button
                                        data-testid="submit-btn"
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
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <Box
                                            component={"div"}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Button
                                                data-testid="edit-btn"
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
                                        <Box
                                            component={"div"}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Button
                                                data-testid="delete-content-btn"
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
                <Typography data-testid="no-content-typ" component={"div"}>
                    {t("admin.no_content")}
                </Typography>
            )}
        </>
    );
}
