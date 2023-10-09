"use client";
import { AppBar, Toolbar, Typography, Button, Select, MenuItem } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function Navbar() {
    const { t, i18n } = useTranslation();
    document.body.dir = i18n.dir();

    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    direction: 'rtl', // Force left-to-right direction
                }}
            >
                <div>
                    <Link href="/">
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ cursor: 'pointer', color: 'white' }}
                        >
                            {t('common.app_name')}
                        </Typography>
                    </Link>
                </div>
                <div>
                    <Select
                        onChange={(e) => i18n.changeLanguage(e.target.value as string)}
                        aria-label="change language"
                        value={i18n.language}
                        sx={{ color: 'white' }}
                    >
                        <MenuItem value="he">עברית</MenuItem>
                        <MenuItem value="arb">العربية</MenuItem>
                        <MenuItem value="rus">Русский</MenuItem>
                    </Select>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
