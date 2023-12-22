"use client";
import { useState, useEffect, useContext, useRef } from "react";
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
  Fab,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { User, onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { useWindowWidth } from "@/app/[lng]/hooks/useWidth";
import { DisplayLanguages } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useScroll from "@/app/[lng]/hooks/useScroll";
import { fabGavelStyle, fabShareStyle, fabStyle, styles } from "@/app/[lng]/Components/UI/NavBar.style";
import { useRouter } from "next/navigation";
import ShareDialog from "../shareDialog/ShareDialog";
import { Gavel } from "@mui/icons-material";

export default function Navbar() {
  const router = useRouter();
  const [openShare, setOpenShare] = useState<boolean>(false);
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
    <MenuItem onClick={() => {
      setOpenMenu(false);
      router.replace(`/${i18n.language}/admin-signin`);
    }}>
      <IconButton>
        <AccountCircleIcon sx={styles.desktopAdminIcon} />
      </IconButton>
    </MenuItem>
  ) : (
    <MenuItem onClick={() => {
      setOpenMenu(false);
      router.replace(`/${i18n.language}/admin`);
    }}>
      <Typography>
        {t(LocalizationKeys.Common.Hello) + " " + userEmail}
      </Typography>
    </MenuItem>
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
            <MenuItem onClick={() => {
              setOpenMenu(false)
              router.replace(`/${i18n.language}/home-page`);
            }}>
              <IconButton
                size="small"
                sx={styles.mobileIconBtnSec}
              >
                <img
                  src="https://i.postimg.cc/8cYjkWqV/logo.png"
                  alt="logo"
                  style={styles.img}
                />
                {t(LocalizationKeys.Common.AppName)}
              </IconButton>
            </MenuItem>
            <MenuItem onClick={() => {
              setOpenMenu(false)
              router.replace(`/${i18n.language}/about-us`);
            }}>
              <Typography textAlign="center">
                {t(LocalizationKeys.Navbar.AboutUs)}
              </Typography>
            </MenuItem>
            {adminPage}
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
          keepMounted
          open={openDesktopMenu}
          onClose={() => setOpenDesktopMenu(false)}
        >
          <MenuItem onClick={() => {
            setOpenDesktopMenu(false)
            router.replace(`/${i18n.language}/about-us`);
          }}>
            <Typography textAlign="center">
              {t(LocalizationKeys.Navbar.AboutUs)}
            </Typography>
          </MenuItem>
          {adminPage}
          <MenuItem onClick={() => {
            setOpenMenu(false)
            router.replace(`/${i18n.language}/magazine`);
          }}>
            <Typography textAlign="center">
              {t(LocalizationKeys.Navbar.Magazine)}
            </Typography>
          </MenuItem>
        </Menu>
        <Link>
          <IconButton
            href={`/${i18n.language}/home-page`}
            size="small"
            sx={styles.desktopIconBtn}
          >
            <img
              src="https://i.postimg.cc/8cYjkWqV/logo.png"
              alt="logo"
              style={styles.desktopImg}
            />
          </IconButton>
        </Link>
        <Box sx={styles.desktopSelect}>
          <Button
            variant="contained"
            color="error"
            sx={{marginLeft: "5px"}}
            onClick={() => router.replace(`/${i18n.language}/emergency-view`)}
          >
            {t(LocalizationKeys.EnergencyView.Title)}
          </Button>
          <Select
            sx={styles.desktopSelectColor}
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

  return (
    <>
      {isMobile ? MobileAppBar : DesktopAppBar}
      <Fab
        color="primary"
        sx={fabGavelStyle}
        onClick={() => router.push(`/${i18n.language}/rights-view`)}
        aria-label="gavel"
      >
        <Gavel />
      </Fab>
      <Fab
        color="primary"
        sx={fabShareStyle}
        onClick={() => setOpenShare(true)}
        aria-label="share"
      >
        <ShareIcon />
      </Fab>
      {authUser && (
        <Fab
          color="primary"
          sx={fabStyle}
          onClick={() => router.push(`/${i18n.language}/upload`)}
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      )}
      <ShareDialog
        open={openShare}
        onClose={() => setOpenShare(false)}
        urlToShare={"https://www.psychinfo.co.il"}
      />
    </>

  );
}
