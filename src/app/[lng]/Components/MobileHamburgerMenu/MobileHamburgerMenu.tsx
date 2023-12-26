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

    const menuItemsArray = [
        {
            text: t(LocalizationKeys.Common.AppName),
            path: `/${i18n.language}/home-page`,
        },
        {
            text: t(LocalizationKeys.Navbar.AboutUs),
            path: `/${i18n.language}/about-us`,
        },
    ];

    return (
        <Menu
            sx={styles.mobileMenu}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            MenuListProps={styles.menuList}
        >
            {menuItemsArray.map((item, index) => (
                <MenuItem
                    key={index}
                    onClick={() => {
                        handleCloseMenu();
                        router.replace(item.path);
                    }}
                >
                    <Typography textAlign="center">{item.text}</Typography>
                </MenuItem>
            ))}
            <AdminPageNavbar handleCloseMenu={handleCloseMenu} />
        </Menu>
    );
}
