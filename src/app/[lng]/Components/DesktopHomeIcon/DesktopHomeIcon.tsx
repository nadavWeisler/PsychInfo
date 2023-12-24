import { IconButton, Link } from "@mui/material";
import { styles } from "@/app/[lng]/Components/DesktopHomeIcon/DesktopHomeIcon.style";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function DesktopHomeIcon() {
    const { i18n } = useTrans();
    return (
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
    );
}
