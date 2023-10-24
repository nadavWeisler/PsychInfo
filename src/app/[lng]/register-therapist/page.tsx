"use client";
import { useState, FormEvent, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Snackbar,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RegisterForm } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styled } from "@mui/material/styles";
import { postTherapist } from "@/app/[lng]/firebase/commands";

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#0f0f0f",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#0f0f0f",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#0f0f0f",
        },
        "&:hover fieldset": {
            borderColor: "#0f0f0f",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#0f0f0f",
        },
    },
});

export default function RegisterTherapistPage() {
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [btnDirection, setBtnDirection] = useState<"ltr" | "rtl">("ltr");

    const { t, direction } = useTrans();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const registerData: RegisterForm = {
            name: data.get("name")?.toString() || "",
            email: data.get("email")?.toString() || "",
            tel: data.get("tel")?.toString() || "",
            profession: data.get("profession")?.toString() || "",
        };
        await postTherapist(registerData);
        setIsSubmit(true);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setIsSubmit(false);
    };

    useEffect(() => {
        if (direction === "rtl") setBtnDirection("ltr");
        else setBtnDirection("rtl");
    }, [direction]);

    const action = (
        <IconButton
            dir={direction}
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            sx={{ width: "auto", position: "absolute", left: 0 }}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
    return (
        <>
            <Box
                sx={{
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        {t("register.title1")}
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                        {t("register.title2")}
                    </Typography>
                </Container>
            </Box>
            <Box
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "auto",
                    mb: 15,
                }}
            >
                <Box component="form" onSubmit={handleSubmit} dir={direction}>
                    <CssTextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label={t("register.name")}
                        name="name"
                        autoFocus
                    />
                    <CssTextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label={t("register.email")}
                        name="email"
                        autoFocus
                    />
                    <CssTextField
                        required
                        margin="normal"
                        fullWidth
                        id="tel"
                        label={t("register.tel")}
                        name="tel"
                        autoFocus
                    />
                    <CssTextField
                        required
                        margin="normal"
                        fullWidth
                        id="profession"
                        label={t("register.profession")}
                        name="profession"
                        autoFocus
                        multiline={true}
                    />
                    <Box dir={btnDirection} sx={{ mt: 5 }}>
                        <Button variant={"contained"} type="submit">
                            {t("common.submit")}
                        </Button>
                    </Box>
                </Box>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={isSubmit}
                    onClose={handleClose}
                    message={t("register.submit_success")}
                    autoHideDuration={6000}
                    action={action}
                />
            </Box>
        </>
    );
}
