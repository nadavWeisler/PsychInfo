import useTrans from "@/app/[lng]/hooks/useTrans";
import { AppBar, Toolbar, Box } from "@mui/material";
import { styles } from "@/app/[lng]/Components/MobileNavbar/MobileNavbar.style";
import { MobileNavbarProps } from "@/app/[lng]/general/interfaces";
import HamburgerMenuIcon from "@/app/[lng]/Components/HamburgerMenuIcon";
import MobileHamburgerMenu from "@/app/[lng]/Components/MobileHamburgerMenu";
import LanguageSelect from "@/app/[lng]/Components/LanguageSelect";

export default function MobileNavbar({
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
}: MobileNavbarProps) {
    const { direction } = useTrans();
    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Box sx={{ ...styles.mobileRoot, direction: direction }}>
                    <HamburgerMenuIcon
                        isMobile={true}
                        handleOpenMenu={handleOpenMenu}
                    />
                    <MobileHamburgerMenu
                        anchorEl={anchorEl}
                        handleCloseMenu={handleCloseMenu}
                    />
                </Box>
                <Box sx={styles.mobileSecondary}>
                    <LanguageSelect />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
