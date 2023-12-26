"use client";
import { useRouter } from "next/navigation";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { styles } from "@/app/[lng]/Components/DesktopHamburgerMenu/DesktopHamburgerMenu.style";
import { DesktopHamburgerMenuProps } from "@/app/[lng]/general/interfaces";
import { Menu, MenuItem, Typography } from "@mui/material";
import AdminPageNavbar from "@/app/[lng]/Components/AdminPageNavbar";

export default function DesktopHamburgerMenu({
    handleCloseMenu,
    anchorEl,
}: DesktopHamburgerMenuProps) {
    const router = useRouter();
    const { t, i18n } = useTrans();

    const menuArray = [
        {
            name: t(LocalizationKeys.Navbar.AboutUs),
            onClick: () => {
                handleCloseMenu();
                router.replace(`/${i18n.language}/about-us`);
            },
        },
        {
            name: t(LocalizationKeys.Navbar.Magazine),
            onClick: () => {
                handleCloseMenu();
                router.replace(`/${i18n.language}/magazine`);
            },
        },
    ];
    return (
        <Menu
            sx={{ ...styles.desktopMenu }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
        >
            {menuArray.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                    <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
            ))}

            <AdminPageNavbar handleCloseMenu={handleCloseMenu} />
        </Menu>
    );
}
