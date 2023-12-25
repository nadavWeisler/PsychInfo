"use client";
import { useState, useEffect } from "react";
import { Typography, Container } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { getAllTags, getAllOrganizations } from "@/app/[lng]/firebase/commands";
import { Tag, Organization } from "@/app/[lng]/general/interfaces";
import { useAppDispatch, useAppSelector } from "@/app/[lng]/hooks/redux";
import { tagsAndOrgActions } from "@/store/tagsAndOrgSlice";
import { RootState } from "@/store";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { styles } from "@/app/[lng]/admin/page.style";
import useAuth from "@/app/[lng]/hooks/useAuth";
import AdminContent from "@/app/[lng]/Components/AdminContent";

export default function AdminPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);

    const { isDelete } = useAppSelector((state: RootState) => state.isState);

    const { t, i18n } = useTrans();
    const { authUser } = useAuth(true);
    const dispatch = useAppDispatch();

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

    if (!authUser) return null;
    return (
        <Container sx={styles.container}>
            <Typography variant={"h4"}>
                {t(LocalizationKeys.Admin.Title)}
            </Typography>
            <AdminContent isDelete={isDelete} />
        </Container>
    );
}
