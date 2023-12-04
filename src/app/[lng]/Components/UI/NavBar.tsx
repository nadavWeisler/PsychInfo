"use client";
import { useState, useEffect, useContext, Fragment } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Select,
    MenuItem,
    Box,
    IconButton,
    Menu,
    Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { User, onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { useWindowWidth } from "@/app/[lng]/hooks/useWidth";
import { DisplayLanguages, NavBarPage } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useScroll from "@/app/[lng]/hooks/useScroll";
import { styles } from "@/app/[lng]/Components/UI/NavBar.style";

export default function Navbar(): React.ReactElement {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [authUser, setAuthUser] = useState<User | null>(null);

    const width = useWindowWidth();
    const [isMobile, setIsMobile] = useState<boolean>(width <= 768);

    const { user } = useContext(AuthContext);

    const { t, i18n, direction } = useTrans();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
        });
    }, [user]);

    useEffect(() => {
        setIsMobile(width <= 768);
    }, [width]);

    const userEmail: string | undefined =
        authUser?.email?.indexOf("@") !== -1
            ? authUser?.email?.split("@")[0]
            : authUser?.email;

    const greetMsg: React.ReactElement = (
        <Link href={`/${i18n.language}/admin`}>
            <Typography variant="h6" component="div" sx={styles.linkTyp}>
                {t(LocalizationKeys.Common.Hello)} {userEmail}
            </Typography>
        </Link>
    );

    const adminLink: React.ReactElement = (
        <Link href={`/${i18n.language}/admin-signin`}>
            <Typography variant="h6" component="div" sx={styles.linkTyp}>
                {t(LocalizationKeys.Navbar.AdminLogIn)}
            </Typography>
        </Link>
    );

    const adminPage = !authUser
        ? {
            text: t(LocalizationKeys.Navbar.AdminLogIn),
            url: `/${i18n.language}/admin-signin`,
        }
        : {
            text: t(LocalizationKeys.Common.Hello) + " " + userEmail,
            url: `/${i18n.language}/admin`,
        };

    const pages: NavBarPage[] = [
        { text: t(LocalizationKeys.Navbar.UploadContent), url: `/${i18n.language}/upload` },
        adminPage,
        {
            text: t(LocalizationKeys.Navbar.FoundMistake),
            url: `/${i18n.language}/found-mistake`,
        },
        { text: t(LocalizationKeys.Navbar.AboutUs), url: `/${i18n.language}/about-us` },
    ];

    useScroll(openMenu, setOpenMenu, isMobile);

    const MobileAppBar: React.ReactElement = (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Box sx={{ ...styles.mobileRoot, direction: direction }}>
                    <IconButton
                        onClick={() => setOpenMenu(true)}
                        sx={styles.mobileIconBtn}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        sx={styles.mobileMenu}
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
                        <MenuItem onClick={() => setOpenMenu(false)}>
                            <Link>
                                <IconButton
                                    href={`/${i18n.language}/home-page`}
                                    size="small"
                                    sx={styles.mobileIconBtnSec}
                                >
                                    <img
                                        src="https://i.ibb.co/HKcWrgn/pic-modified-modified-new.png"
                                        alt="logo"
                                        style={styles.img}
                                    />
                                    {t(LocalizationKeys.Common.AppName)}
                                </IconButton>
                            </Link>
                        </MenuItem>
                        {pages.map((page, index) => (
                            <MenuItem key={index} onClick={() => setOpenMenu(false)}>
                                <Fragment>
                                    <Link href={page.url}>
                                        <Typography textAlign="center" component="div">
                                            {page.text}
                                        </Typography>
                                    </Link>
                                </Fragment>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box sx={styles.mobileSecondary}>
                    <Select
                        onChange={(e) =>
                            i18n.changeLanguage(e.target.value as string)
                        }
                        aria-label="change language"
                        value={i18n.language}
                        sx={styles.mobileSelect}
                    >
                        {Object.keys(DisplayLanguages).map((lang) => (
                            <MenuItem key={lang} value={lang}>
                                {DisplayLanguages[lang as keyof typeof DisplayLanguages]}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Toolbar>
        </AppBar>
    );

    const DesktopAppBar: React.ReactElement = (
        <AppBar position="static">
            <Toolbar
                sx={{
                    ...styles.desktopRoot,
                    direction: direction,
                }}
            >
                <div>
                    <Link>
                        <IconButton
                            href={`/${i18n.language}/home-page`}
                            size="small"
                            sx={styles.desktopIconBtn}
                        >
                            <img
                                src="https://i.ibb.co/HKcWrgn/pic-modified-modified-new.png"
                                alt="logo"
                                style={styles.desktopImg}
                            />
                            {t(LocalizationKeys.Common.AppName)}
                        </IconButton>
                    </Link>
                </div>
                <div>
                    <Link href={`/${i18n.language}/upload`}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={styles.desktopTyp}
                        >
                            {t(LocalizationKeys.Navbar.UploadContent)}
                        </Typography>
                    </Link>
                </div>
                <div>
                    {!!authUser && authUser !== null ? greetMsg : adminLink}
                </div>
                <div>
                    <Link href={`/${i18n.language}/found-mistake`}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={styles.desktopTyp}
                        >
                            {t(LocalizationKeys.Navbar.FoundMistake)}
                        </Typography>
                    </Link>
                </div>
                <div>
                    <Link href={`/${i18n.language}/about-us`}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={styles.desktopTyp}
                        >
                            {t(LocalizationKeys.Navbar.AboutUs)}
                        </Typography>
                    </Link>
                </div>

                <div>
                    <Select
                        onChange={(e) => i18n.changeLanguage(e.target.value as string)}
                        aria-label="change language"
                        value={i18n.language || "he"}
                        sx={styles.desktopSelect}
                    >
                        {Object.keys(DisplayLanguages).map((lang) => (
                            <MenuItem key={lang} value={lang}>
                                {DisplayLanguages[lang as keyof typeof DisplayLanguages]}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </Toolbar>
        </AppBar>
    );

    return isMobile ? MobileAppBar : DesktopAppBar;
}
