"use client";
import { useState, useEffect, useContext } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Select,
    MenuItem,
    Container,
    Box,
    IconButton,
    Menu,
    Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { User, onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { auth } from "@/app/firebase/app";
import { AuthContext } from "@/app/context/AuthContext";

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = () => setOpenMenu(true);
    const handleCloseMenu = () => setOpenMenu(false);
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [width, setWidth] = useState<number>(window.innerWidth);

    const { user } = useContext(AuthContext);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
        });
    }, [user]);

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    const isMobile = width <= 768;

    const { t, i18n } = useTranslation();
    document.body.dir = i18n.dir();
    const pages = [
        { text: t("common.app_name"), url: "/" },
        { text: "העלאת תוכן", url: "/upload" },
        { text: "אדמין? התחבר", url: "/admin-signin" },
    ];
    const ResponsiveAppBar = (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="פתח תפריט">
                            <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
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
                            onClose={handleCloseMenu}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseMenu}>
                                    <div>
                                        <Link href={page.url}>
                                            <Typography textAlign="center">
                                                {page.text}
                                            </Typography>
                                        </Link>
                                    </div>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ mr: 30 }}>
                        <Select
                            onChange={(e) =>
                                i18n.changeLanguage(e.target.value as string)
                            }
                            aria-label="change language"
                            value={i18n.language}
                            sx={{ color: "white" }}
                        >
                            <MenuItem value="he">עברית</MenuItem>
                            <MenuItem value="arb">العربية</MenuItem>
                            <MenuItem value="rus">Русский</MenuItem>
                        </Select>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
    const userEmail =
        authUser?.email?.indexOf("@") !== -1
            ? authUser?.email?.split("@")[0]
            : authUser?.email;
    const greetMsg = (
        <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer", color: "white" }}
        >
            שלום {userEmail}
        </Typography>
    );

    const adminLink = (
        <Link href="/admin-signin">
            <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer", color: "white" }}
            >
                אדמין? התחבר
            </Typography>
        </Link>
    );

    const adminDisplay = !!authUser && authUser !== null ? greetMsg : adminLink;

    const DesktopAppBar = (
        <AppBar position="static">
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    direction: "rtl", // Force left-to-right direction
                }}
            >
                <div>
                    <Link href="/">
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ cursor: "pointer", color: "white" }}
                        >
                            {t("common.app_name")}
                        </Typography>
                    </Link>
                </div>
                <div>
                    <Link href="/upload">
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ cursor: "pointer", color: "white" }}
                        >
                            העלאת תוכן
                        </Typography>
                    </Link>
                </div>
                <div>{adminDisplay}</div>

                <div>
                    <Select
                        onChange={(e) =>
                            i18n.changeLanguage(e.target.value as string)
                        }
                        aria-label="change language"
                        value={i18n.language}
                        sx={{ color: "white" }}
                    >
                        <MenuItem value="he">עברית</MenuItem>
                        <MenuItem value="arb">العربية</MenuItem>
                        <MenuItem value="rus">Русский</MenuItem>
                    </Select>
                </div>
            </Toolbar>
        </AppBar>
    );

    const display = isMobile ? ResponsiveAppBar : DesktopAppBar;
    return display;
}

export default Navbar;
