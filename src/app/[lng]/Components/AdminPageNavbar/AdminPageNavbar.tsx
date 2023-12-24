"use client";
import { IconButton, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import useTrans from "@/app/[lng]/hooks/useTrans";
import useAuth from "@/app/[lng]/hooks/useAuth";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styles } from "@/app/[lng]/Components/AdminPageNavbar/AdminPageNavbar.style";
import { AdminPageNavbarProps } from "@/app/[lng]/general/interfaces";

export default function AdminPageNavbar({ setOpenMenu }: AdminPageNavbarProps) {
    const { authUser } = useAuth();
    const router = useRouter();
    const { t, i18n } = useTrans();

    const userEmail: string | undefined =
        authUser?.email?.indexOf("@") !== -1
            ? authUser?.email?.split("@")[0]
            : authUser?.email;
    return (
        <>
            {!authUser ? (
                <MenuItem
                    onClick={() => {
                        setOpenMenu(false);
                        router.replace(`/${i18n.language}/admin-signin`);
                    }}
                >
                    <IconButton>
                        <AccountCircleIcon sx={styles.adminIcon} />
                    </IconButton>
                </MenuItem>
            ) : (
                <MenuItem
                    onClick={() => {
                        setOpenMenu(false);
                        router.replace(`/${i18n.language}/admin`);
                    }}
                >
                    <Typography>
                        {t(LocalizationKeys.Common.Hello) + " " + userEmail}
                    </Typography>
                </MenuItem>
            )}
        </>
    );
}
