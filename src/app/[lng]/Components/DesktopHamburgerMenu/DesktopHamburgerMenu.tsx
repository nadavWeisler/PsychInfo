import { useRouter } from "next/navigation";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { styles } from "@/app/[lng]/Components/DesktopHamburgerMenu/DesktopHamburgerMenu.style";
import { DesktopHamburgerMenuProps } from "@/app/[lng]/general/interfaces";
import { Menu, MenuItem, Typography } from "@mui/material";
import AdminPageNavbar from "@/app/[lng]/Components/AdminPageNavbar";

export default function DesktopHamburgerMenu({
    openDesktopMenu,
    setOpenDesktopMenu,
    setOpenMenu,
    iconButtonRef,
}: DesktopHamburgerMenuProps) {
    const router = useRouter();
    const { t, i18n } = useTrans();
    return (
        <Menu
            sx={styles.desktopMenu}
            anchorEl={iconButtonRef.current}
            keepMounted
            open={openDesktopMenu}
            onClose={() => setOpenDesktopMenu(false)}
        >
            <MenuItem
                onClick={() => {
                    setOpenDesktopMenu(false);
                    router.replace(`/${i18n.language}/about-us`);
                }}
            >
                <Typography textAlign="center">
                    {t(LocalizationKeys.Navbar.AboutUs)}
                </Typography>
            </MenuItem>

            <AdminPageNavbar setOpenMenu={setOpenMenu} />
            <MenuItem
                onClick={() => {
                    setOpenMenu(false);
                    router.replace(`/${i18n.language}/magazine`);
                }}
            >
                <Typography textAlign="center">
                    {t(LocalizationKeys.Navbar.Magazine)}
                </Typography>
            </MenuItem>
        </Menu>
    );
}
