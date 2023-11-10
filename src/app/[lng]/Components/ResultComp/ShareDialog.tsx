import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Button,
} from "@mui/material";
import {
    FacebookShareButton,
    TwitterShareButton,
    EmailShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    FacebookIcon,
    TwitterIcon,
    EmailIcon,
    WhatsappIcon,
    LinkedinIcon,
    TelegramIcon,
} from "react-share";
import { ShareDialogProps } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/ResultComp/ShareDialog.style";

export default function ShareDialog({
    open,
    urlToShare,
    onClose,
}: ShareDialogProps) {
    const { t } = useTrans();

    const shareBtns: React.ReactElement[] = [
        <FacebookShareButton url={urlToShare}>
            <FacebookIcon />
        </FacebookShareButton>,
        <TwitterShareButton url={urlToShare}>
            <TwitterIcon />
        </TwitterShareButton>,
        <EmailShareButton url={urlToShare}>
            <EmailIcon />
        </EmailShareButton>,
        <WhatsappShareButton url={urlToShare}>
            <WhatsappIcon />
        </WhatsappShareButton>,
        <LinkedinShareButton url={urlToShare}>
            <LinkedinIcon />
        </LinkedinShareButton>,
        <TelegramShareButton url={urlToShare}>
            <TelegramIcon />
        </TelegramShareButton>,
    ];

    return (
        <Dialog onClose={onClose} open={open} sx={styles.root}>
            <DialogContent>
                <DialogTitle>{t(LocalizationKeys.Common.Share)}</DialogTitle>
                <Grid container spacing={2}>
                    {shareBtns.map((btn, index) => (
                        <Grid item xs={6} sm={6} md={4} key={index}>
                            {btn}
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} onClick={onClose}>
                    {t(LocalizationKeys.Common.Close)}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
