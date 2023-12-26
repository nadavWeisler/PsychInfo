import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { styles } from "@/app/[lng]/Components/MobileHamburgerMenu/MobileHamburgerMenu.style";
import { MobileHamburgerMenuProps } from "@/app/[lng]/general/interfaces";
import AdminPageNavbar from "@/app/[lng]/Components/AdminPageNavbar";

export default function MobileHamburgerMenu({
    anchorEl,
    handleCloseMenu,
}: MobileHamburgerMenuProps) {
    const router = useRouter();
    const { t, i18n } = useTrans();

    return (
        <Menu
            sx={styles.mobileMenu}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
        >
            <MenuItem
                onClick={() => {
                    handleCloseMenu();
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
                    handleCloseMenu();
                    router.replace(`/${i18n.language}/about-us`);
                }}
            >
                <Typography textAlign="center">
                    {t(LocalizationKeys.Navbar.AboutUs)}
                </Typography>
            </MenuItem>
            <AdminPageNavbar handleCloseMenu={handleCloseMenu} />
        </Menu>
    );
}
