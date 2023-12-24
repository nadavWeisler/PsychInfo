"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Fab } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import { Gavel } from "@mui/icons-material";
import { useWindowWidth } from "@/app/[lng]/hooks/useWidth";
import useTrans from "@/app/[lng]/hooks/useTrans";
import useScroll from "@/app/[lng]/hooks/useScroll";
import useAuth from "@/app/[lng]/hooks/useAuth";
import { styles } from "@/app/[lng]/Components/NavBar/NavBar.style";
import ShareDialog from "@/app/[lng]/Components/ShareDialog";
import DesktopNavbar from "@/app/[lng]/Components/DesktopNavbar";
import MobileNavbar from "@/app/[lng]/Components/MobileNavbar";

export default function Navbar() {
    const width = useWindowWidth();
    const [openShare, setOpenShare] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(width <= 768);

    const { i18n } = useTrans();
    const { authUser } = useAuth();
    const router = useRouter();
    useScroll(openMenu, setOpenMenu, isMobile);

    useEffect(() => {
        setIsMobile(width <= 768);
    }, [width]);

    const fabArray = [
        {
            icon: <Gavel />,
            label: "gavel",
            style: styles.fabGavelStyle,
            onClick: () => router.push(`/${i18n.language}/rights-view`),
        },
        {
            icon: <ShareIcon />,
            label: "share",
            style: styles.fabShareStyle,
            onClick: () => setOpenShare(true),
        },
    ];

    return (
        <>
            {isMobile ? (
                <MobileNavbar setOpenMenu={setOpenMenu} openMenu={openMenu} />
            ) : (
                <DesktopNavbar setOpenMenu={setOpenMenu} />
            )}
            {fabArray.map((fab, index) => (
                <Fab
                    key={index}
                    color="primary"
                    sx={fab.style}
                    onClick={fab.onClick}
                    aria-label={fab.label}
                >
                    {fab.icon}
                </Fab>
            ))}
            {authUser ? (
                <Fab
                    color="primary"
                    sx={styles.fabStyle}
                    onClick={() => router.push(`/${i18n.language}/upload`)}
                    aria-label="add"
                >
                    <AddIcon />
                </Fab>
            ) : null}
            <ShareDialog
                open={openShare}
                onClose={() => setOpenShare(false)}
                urlToShare={"https://www.psychinfo.co.il"}
            />
        </>
    );
}
