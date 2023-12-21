"use client";
import { useState, useEffect, useContext, useRef  } from "react";
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
  Icon,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
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
  const [openDesktopMenu, setOpenDesktopMenu] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<User | null>(null);

  const width = useWindowWidth();
  const [isMobile, setIsMobile] = useState<boolean>(width <= 768);

  const iconButtonRef = useRef(null);
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

  const adminPage = !authUser ? (
    <IconButton href={`/${i18n.language}/admin-signin`}>
      <AccountCircleIcon sx={styles.desktopAdminIcon} />
    </IconButton>
  ) : (
    <Link href={`/${i18n.language}/admin`}>
      <Typography textAlign="center" component="div">
        {t(LocalizationKeys.Common.Hello) + " " + userEmail}
      </Typography>
    </Link>
  );

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
              <MenuItem onClick={() => setOpenMenu(false)}>
                  <Link href={`/${i18n.language}/about-us`}>
                    <Typography textAlign="center" component="div">
                      {t(LocalizationKeys.Navbar.AboutUs)}
                    </Typography>
                  </Link>
              </MenuItem>
            <MenuItem onClick={() => setOpenMenu(false)}>{adminPage}</MenuItem>
          </Menu>
        </Box>
        <Box sx={styles.mobileSecondary}>
          <Select
            onChange={(e) => i18n.changeLanguage(e.target.value as string)}
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
        <IconButton
            ref={iconButtonRef}
            onClick={() => setOpenDesktopMenu(true)}
            sx={styles.desktopIconBtn}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            sx={styles.desktopMenu}
            anchorEl={iconButtonRef.current}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={openDesktopMenu}
            onClose={() => setOpenDesktopMenu(false)}
          >
            <MenuItem onClick={() => setOpenDesktopMenu(false)}>
                  <Link href={`/${i18n.language}/about-us`}>
                    <Typography textAlign="center" component="div">
                      {t(LocalizationKeys.Navbar.AboutUs)}
                    </Typography>
                  </Link>
              </MenuItem>
            <MenuItem onClick={() => setOpenMenu(false)}>{adminPage}</MenuItem>
            <MenuItem onClick={() => setOpenMenu(false)}>
            <Link href={`/${i18n.language}/magazine`}>
                    <Typography textAlign="center" component="div">
                      {t(LocalizationKeys.Navbar.Magazine)}
                    </Typography>
                  </Link>
            </MenuItem>
          </Menu>
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
          <Box sx={styles.desktopSelect}>
          <Select
            onChange={(e) => i18n.changeLanguage(e.target.value as string)}
            aria-label="change language"
            value={i18n.language || "he"}
            
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

  return isMobile ? MobileAppBar : DesktopAppBar;
}
