"use client";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { AppBar, Toolbar, Box } from "@mui/material";
import { styles } from "@/app/[lng]/Components/DesktopNavbar/DesktopNavbar.style";
import HamburgerMenuIcon from "@/app/[lng]/Components/HamburgerMenuIcon";
import { DesktopNavbarProps } from "@/app/[lng]/general/interfaces";
import DesktopHamburgerMenu from "@/app/[lng]/Components/DesktopHamburgerMenu";
import LanguageSelect from "@/app/[lng]/Components/LanguageSelect";
import DesktopHomeIcon from "@/app/[lng]/Components/DesktopHomeIcon";
import EmergencyButton from "@/app/[lng]/Components/EmergencyButton";

export default function DesktopNavbar({
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
}: DesktopNavbarProps) {
    const { direction } = useTrans();

    return (
        <AppBar position="sticky" dir={direction}>
            <Toolbar
                sx={{
                    ...styles.desktopRoot,
                    direction: direction,
                }}
            >
                <HamburgerMenuIcon
                    handleOpenMenu={handleOpenMenu}
                    isMobile={false}
                />

                <DesktopHamburgerMenu
                    anchorEl={anchorEl}
                    handleCloseMenu={handleCloseMenu}
                />
                <DesktopHomeIcon />
                <Box
                    sx={
                        direction === "rtl"
                            ? styles.desktopSelectRtl
                            : styles.desktopSelectLtr
                    }
                >
                    <EmergencyButton />
                    <LanguageSelect />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
