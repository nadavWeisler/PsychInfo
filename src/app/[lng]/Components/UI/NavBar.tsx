"use client";
import { useState, useEffect, useContext, Fragment } from "react";
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
    Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { User, onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "@/i18n/client";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { useWindowWidth } from "@/app/[lng]/hooks/useWidth";
import { DisplayLanguages, NavBarPage } from "@/app/[lng]/general/interfaces";
import { useParams } from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";

export default function Navbar(): React.ReactElement {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [authUser, setAuthUser] = useState<User | null>(null);

    const width = useWindowWidth();
    const [isMobile, setIsMobile] = useState<boolean>(width <= 768);
    const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");

    const { user } = useContext(AuthContext);

    const locale = useParams()?.locale as LocaleTypes;
    const { t, i18n } = useTranslation(locale, "translation");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
        });
    }, [user]);

    useEffect(() => {
        setIsMobile(width <= 768);
    }, [width]);

    useEffect(() => {
        setDirection(i18n.dir());
    }, [i18n.language]);

    const pages: NavBarPage[] = [
        { text: t("common.app_name"), url: `/${i18n.language}` },
        { text: t("navbar.upload_content"), url: `${i18n.language}/upload` },
        {
            text: t("navbar.admin_log_in"),
            url: `${i18n.language}/admin-signin`,
        },
        {
            text: t("navbar.found_mistake"),
            url: `${i18n.language}/found-mistake`,
        },
    ];

    const ResponsiveAppBar: React.ReactElement = (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Box sx={{ flexGrow: 0, direction: direction }}>
                    <IconButton onClick={() => setOpenMenu(true)} sx={{ p: 0 }}>
                        <MenuIcon />
                    </IconButton>
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
                        onClose={() => setOpenMenu(false)}
                    >
                        {pages.map((page, index) => (
                            <MenuItem key={index} onClick={() => setOpenMenu(false)}>
                                <Fragment>
                                    <Link href={page.url}>
                                        <Typography
                                            textAlign="center"
                                            component="div"
                                        >
                                            {page.text}
                                        </Typography>
                                    </Link>
                                </Fragment>
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
                        {Object.keys(DisplayLanguages).map((lang) => (
                            <MenuItem key={lang} value={lang}>
                                {
                                    DisplayLanguages[
                                    lang as keyof typeof DisplayLanguages
                                    ]
                                }
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Toolbar>
        </AppBar>
    );

    const userEmail: string | undefined = authUser?.email?.indexOf("@") !== -1
        ? authUser?.email?.split("@")[0]
        : authUser?.email;

    const greetMsg: React.ReactElement = (
        <Link href={`/${i18n.language}/admin`}>
            <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer", color: "white" }}
            >
                {t("common.hello")} {userEmail}
            </Typography>
        </Link>
    );

    const adminLink: React.ReactElement = (
        <Link href={`/${i18n.language}/admin-signin`}>
            <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer", color: "white" }}
            >
                {t("navbar.admin_log_in")}
            </Typography>
        </Link>
    );

    const DesktopAppBar: React.ReactElement = (
        <AppBar position="static">
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    direction: direction, // Force left-to-right direction
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
                    <Link href={`/${i18n.language}/upload`}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ cursor: "pointer", color: "white" }}
                        >
                            {t("navbar.upload_content")}
                        </Typography>
                    </Link>
                </div>
                <div>
                    {
                        (!!authUser && authUser !== null)
                            ? greetMsg
                            : adminLink
                    }
                </div>
                <div>
                    <Link href={`/${i18n.language}/found-mistake`}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ cursor: "pointer", color: "white" }}
                        >
                            {t("navbar.found_mistake")}
                        </Typography>
                    </Link>
                </div>

                <div>
                    <Select
                        onChange={(e) =>
                            i18n.changeLanguage(e.target.value as string)
                        }
                        aria-label="change language"
                        value={i18n.language || "he"}
                        sx={{
                            color: "white",
                        }}
                    >
                        {Object.keys(DisplayLanguages).map((lang) => (
                            <MenuItem key={lang} value={lang}>
                                {
                                    DisplayLanguages[
                                    lang as keyof typeof DisplayLanguages
                                    ]
                                }
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </Toolbar>
        </AppBar>
    );

    return (
        isMobile ?
            ResponsiveAppBar :
            DesktopAppBar
    );
}
