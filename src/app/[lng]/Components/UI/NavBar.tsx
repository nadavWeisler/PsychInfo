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
import { DisplayLanguages } from "@/app/[lng]/general/interfaces";
import {
    useRouter,
    useParams,
    useSelectedLayoutSegments,
    usePathname,
} from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";

export default function Navbar({ lng = "he" }: { lng: string }) {
    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = () => setOpenMenu(true);
    const handleCloseMenu = () => setOpenMenu(false);
    const [authUser, setAuthUser] = useState<User | null>(null);
    const width = useWindowWidth();
    const [isMobile, setIsMobile] = useState<Boolean>(width <= 768);
    const { user } = useContext(AuthContext);

    const router = useRouter();
    const params = useParams();
    const urlSegments = useSelectedLayoutSegments();
    const pathName = usePathname();
    const locale = useParams()?.locale as LocaleTypes;
    const { t, i18n } = useTranslation(locale, "translation");

    // const [t, setT] = useState<TFunction<any, any> | Function>(
    //     () => () => null
    // );
    // const [i18n, setI18n] = useState<any>({ language: "he" });
    // useEffect(() => {
    //     useTranslation(lng, "translation").then((res) => {
    //         const { t, i18n } = res;
    //         setT(t);
    //         setI18n(i18n);
    //     });
    // }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
        });
    }, [user]);

    useEffect(() => {
        setIsMobile(width <= 768);
    }, [width]);

    // useEffect(() => {
    //     document.body.dir = i18n.dir();
    // }, [i18n.language]);

    const handleLocaleChange = (event: any) => {
        const newLocale = event.target.value;

        router.push(`/${newLocale}/${urlSegments.join("/")}`);
    };

    const pages = [
        { text: t("common.app_name"), url: "/" },
        { text: t("navbar.upload_content"), url: "/upload" },
        { text: t("navbar.admin_log_in"), url: "/admin-signin" },
    ];

    const ResponsiveAppBar = (
        <AppBar position="static">
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0, direction: "rtl" }}>
                        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
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
                            onClose={handleCloseMenu}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseMenu}>
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
                            // onChange={handleLocaleChange}
                            aria-label="change language"
                            // value={i18n.language}
                            value={params.lng}
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
            </Container>
        </AppBar>
    );

    const userEmail =
        authUser?.email?.indexOf("@") !== -1
            ? authUser?.email?.split("@")[0]
            : authUser?.email;
    const greetMsg = (
        <Link href="/admin">
            <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer", color: "white" }}
            >
                {t("common.hello")} {userEmail}
            </Typography>
        </Link>
    );

    const adminLink = (
        <Link href="/admin-signin">
            <Typography
                variant="h6"
                component="div"
                sx={{ cursor: "pointer", color: "white" }}
            >
                {t("navbar.admin_log_in")}
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
                            {t("navbar.upload_content")}
                        </Typography>
                    </Link>
                </div>
                <div>{adminDisplay}</div>

                <div>
                    <Select
                        onChange={(e) =>
                            i18n.changeLanguage(e.target.value as string)
                        }
                        // onChange={handleLocaleChange}
                        aria-label="change language"
                        // value={i18n.language || "he"}
                        value={params.lng}
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

    const display = isMobile ? ResponsiveAppBar : DesktopAppBar;
    return display;
}
