import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { styles } from "@/app/[lng]/Components/MobileHamburgerMenu/MobileHamburgerMenu.style";
import { MobileHamburgerMenuProps } from "@/app/[lng]/general/interfaces";
import AdminPageNavbar from "@/app/[lng]/Components/AdminPageNavbar";

export default function MobileHamburgerMenu({
    openMenu,
    setOpenMenu,
}: MobileHamburgerMenuProps) {
    const router = useRouter();
    const { t, i18n } = useTrans();
    return (
        <Menu
            sx={styles.mobileMenu}
            id="menu-appbar"
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={openMenu}
            onClose={() => setOpenMenu(false)}
        >
            <MenuItem
                onClick={() => {
                    setOpenMenu(false);
                    router.replace(`/${i18n.language}/home-page`);
                }}
            >
                <IconButton size="small" sx={styles.mobileIconBtnSec}>
                    <img
                        src="https://i.postimg.cc/8cYjkWqV/logo.png"
                        alt="logo"
                        style={styles.img}
                    />
                    {t(LocalizationKeys.Common.AppName)}
                </IconButton>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    setOpenMenu(false);
                    router.replace(`/${i18n.language}/about-us`);
                }}
            >
                <Typography textAlign="center">
                    {t(LocalizationKeys.Navbar.AboutUs)}
                </Typography>
            </MenuItem>
            <AdminPageNavbar setOpenMenu={setOpenMenu} />
        </Menu>
    );
}
