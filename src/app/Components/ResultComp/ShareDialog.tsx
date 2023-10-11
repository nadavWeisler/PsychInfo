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
import { ShareDialogProps } from "@/app/general/interfaces";
import { useTranslation } from "react-i18next";

function ShareDialog({ open, onClose, urlToShare, }: ShareDialogProps) {
    const { t } = useTranslation();
    const shareBtns = [
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
        <Dialog onClose={onClose} open={open}>
            <DialogContent>
                <DialogTitle>{t("common.share")}</DialogTitle>
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
                    {t("common.close")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ShareDialog;
