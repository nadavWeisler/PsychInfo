"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { Button, Box, Typography, Container } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import ControlPanel from "@/app/[lng]/Components/ControlPanel";
import { getAllTags, getAllOrganizations } from "@/app/[lng]/firebase/commands";
import { Tag, Organization } from "@/app/[lng]/general/interfaces";
import { useAppDispatch, useAppSelector } from "@/app/[lng]/hooks/redux";
import { tagsAndOrgActions } from "@/store/tagsAndOrgSlice";
import { isStateActions } from "@/store/isStateSlice";
import { RootState } from "@/store";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { styles } from "@/app/[lng]/admin/page.style";

export default function AdminPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);

    const { isDelete } = useAppSelector((state: RootState) => state.isState);

    const { t, i18n } = useTrans();
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/");
            }
        });
    }, [user]);

    useEffect(() => {
        getAllTags(false, i18n.language)
            .then((tags) => {
                setTags(tags);
            })
            .catch((error) => {
                console.log(error);
            });
        getAllOrganizations(false, i18n.language)
            .then((organizations) => {
                setOrganizations(organizations);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [isDelete]);

    useEffect(() => {
        dispatch(tagsAndOrgActions.getData({ tags, organizations }));
    }, [tags, organizations]);

    function logoutHandler(): void {
        signOut(auth)
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (!user) return null;
    return (
        <Container sx={styles.container}>
            <Typography variant={"h4"}>
                {t(LocalizationKeys.Admin.Title)}
            </Typography>
            <Box sx={styles.box}>
                <ControlPanel
                    isDeleteHandler={() =>
                        dispatch(isStateActions.setIsDelete())
                    }
                    isDelete={isDelete}
                />
                <Button
                    onClick={logoutHandler}
                    sx={styles.button}
                    variant={"contained"}
                >
                    {t(LocalizationKeys.Common.Logout)}
                </Button>
            </Box>
        </Container>
    );
}
