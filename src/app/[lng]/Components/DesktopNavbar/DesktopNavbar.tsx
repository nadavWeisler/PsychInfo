"use client";
import { useState, useRef } from "react";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { AppBar, Toolbar, Box } from "@mui/material";
import { styles } from "@/app/[lng]/Components/DesktopNavbar/DesktopNavbar.style";
import HamburgerMenuIcon from "@/app/[lng]/Components/HamburgerMenuIcon";
import { DesktopNavbarProps } from "@/app/[lng]/general/interfaces";
import DesktopHamburgerMenu from "@/app/[lng]/Components/DesktopHamburgerMenu";
import LanguageSelect from "@/app/[lng]/Components/LanguageSelect";
import DesktopHomeIcon from "@/app/[lng]/Components/DesktopHomeIcon";
import EmergencyButton from "@/app/[lng]/Components/EmergencyButton";

export default function DesktopNavbar({ setOpenMenu }: DesktopNavbarProps) {
    const [openDesktopMenu, setOpenDesktopMenu] = useState<boolean>(false);
    const { direction } = useTrans();
    const iconButtonRef = useRef(null);
    return (
        <AppBar position="static">
            <Toolbar sx={{ ...styles.desktopRoot, direction: direction }}>
                <HamburgerMenuIcon
                    iconButtonRef={iconButtonRef}
                    setOpenMenu={() => setOpenDesktopMenu(true)}
                    isMobile={false}
                />

                <DesktopHamburgerMenu
                    iconButtonRef={iconButtonRef}
                    openDesktopMenu={openDesktopMenu}
                    setOpenDesktopMenu={setOpenDesktopMenu}
                    setOpenMenu={setOpenMenu}
                />
                <DesktopHomeIcon />
                <Box sx={styles.desktopSelect}>
                    <EmergencyButton />
                    <LanguageSelect />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
