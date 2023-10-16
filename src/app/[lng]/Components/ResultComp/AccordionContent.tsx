"use client";
import React, { useState, useEffect, useContext } from "react";
import { Typography, Box, Chip, Link, Grid, Button } from "@mui/material";
import ShareDialog from "@/app/[lng]/Components/ResultComp/ShareDialog";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { deleteContent } from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";
import EditContentDialog from "@/app/[lng]/Components/AdminComp/EditContentDialog";
import {
    AccordionContentProps,
    DisplayLanguages,
    Content,
} from "@/app/[lng]/general/interfaces";
import { ifValidLink, isEmptyOrSpaces } from "@/app/[lng]/general/utils";

export default function AccordionContent({ data }: AccordionContentProps) {
    const [openShare, setOpenShare] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

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
        deleteContent(data.id);
    };

    return (
        <div>
            <Box
                dir={direction}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                }}
            >
                {!isEmptyOrSpaces(data.link) && ifValidLink(data.link) && (
                    <Box
                        dir={direction}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Typography
                            dir={direction}
                            sx={{ margin: "10px" }}
                            variant="h6"
                        >
                            {t("common.link")}:
                        </Typography>
                        <Link
                            dir={direction}
                            margin={"15px"}
                            href={data.link}
                            target="_blank"
                            rel="noopener"
                            sx={{
                                color: "blue",
                                textDecoration: "underline",
                            }}
                        >
                            {data.link}
                        </Link>
                    </Box>
                )}
                <Box
                    dir={direction}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Typography
                        dir={direction}
                        sx={{ margin: "10px" }}
                        variant="h6"
                    >
                        {t("common.organization")}:&nbsp;
                    </Typography>
                    {[data.organization].map((org) => (
                        <Chip
                            sx={{ margin: "10px" }}
                            key={org.id}
                            label={org.display}
                            variant="outlined"
                        />
                    ))}
                </Box>
                <Box
                    dir={direction}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Typography
                        dir={direction}
                        sx={{ margin: "10px" }}
                        variant="h6"
                    >
                        {t("common.language")}:
                    </Typography>
                    {[data.languageId].map((lang) => (
                        <Chip
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
                    dir={direction}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Typography
                        dir={direction}
                        sx={{ margin: "10px" }}
                        variant="h6"
                    >
                        {t("common.tags")}:
                    </Typography>
                    <Grid spacing={4} marginTop={"10px"}>
                        {data.tags.map((tag) => (
                            <Chip
                                sx={{ marginRight: "5px", marginTop: "3px" }}
                                key={tag.id}
                                label={tag.display}
                                variant="outlined"
                            />
                        ))}
                    </Grid>
                </Box>
                <Box
                    dir={direction}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Typography
                        dir={direction}
                        sx={{ margin: "10px" }}
                        variant="h6"
                    >
                        {t("common.description")}:
                    </Typography>
                    <Typography
                        dir={direction}
                        sx={{ margin: "10px" }}
                        variant="h6"
                    >
                        {data.description}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: "flex", direction: "row" }}>
                <Button
                    sx={{ margin: "auto" }}
                    color={"success"}
                    variant={"outlined"}
                    onClick={() => setOpenShare(true)}
                >
                    {t("common.share")}
                </Button>
                {isAdmin && (
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Button
                            sx={{ margin: "auto" }}
                            color={"success"}
                            variant={"outlined"}
                            onClick={() => setOpenEdit(true)}
                        >
                            {t("common.edit")}
                        </Button>
                    </Box>
                )}

                {isAdmin && (
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Button
                            sx={{ margin: "auto" }}
                            color={"error"}
                            variant={"outlined"}
                            onClick={deleteSelectedContent}
                        >
                            {t("common.delete")}
                        </Button>
                    </Box>
                )}
            </Box>
            <ShareDialog
                open={openShare}
                onClose={() => setOpenShare(false)}
                urlToShare={data.link}
            />
            <EditContentDialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                prevContent={data}
            />
        </div>
    );
}
