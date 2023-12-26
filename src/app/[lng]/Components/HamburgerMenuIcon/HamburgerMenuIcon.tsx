import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styles } from "@/app/[lng]/Components/HamburgerMenuIcon/HamburgerMenuIcon.style";
import { HamburgerMenuIconProps } from "@/app/[lng]/general/interfaces";

export default function HamburgerMenuIcon({
    isMobile,
    handleOpenMenu,
}: HamburgerMenuIconProps) {
    return (
        <IconButton
            onClick={handleOpenMenu}
            sx={isMobile ? styles.mobileIconBtn : styles.desktopIconBtn}
        >
            <MenuIcon />
        </IconButton>
    );
}
