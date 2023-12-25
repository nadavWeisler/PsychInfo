import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styles } from "@/app/[lng]/Components/CloseButton/CloseButton.style";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { CloseButtonProps } from "@/app/[lng]/general/interfaces";
export default function CloseButton({ handleClose }: CloseButtonProps) {
    const { direction } = useTrans();
    return (
        <IconButton
            dir={direction}
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            sx={styles.iconBtn}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
}
