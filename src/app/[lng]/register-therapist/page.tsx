"use client";
import { useState, FormEvent, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { RegisterForm } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function RegisterTherapistPage() {
    const [btnDirection, setBtnDirection] = useState<"ltr" | "rtl">("ltr");

    const { t, direction } = useTrans();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const registerData: RegisterForm = {
            name: data.get("name")?.toString() || "",
            email: data.get("email")?.toString() || "",
            tel: data.get("tel")?.toString() || "",
            profession: data.get("profession")?.toString() || "",
        };
        // TODO: send data to DB
    };

    useEffect(() => {
        if (direction === "rtl") setBtnDirection("ltr");
        else setBtnDirection("rtl");
    }, [direction]);
    return (
        <>
            <Typography>// TODO: add title</Typography>
            <Box
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "auto",
                }}
            >
                <Box component="form" onSubmit={handleSubmit} dir={direction}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label={t("mistake.name")} // TODO: change label
                        name="name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label={t("mistake.email")} // TODO: change label
                        name="email"
                        autoFocus
                    />
                    <TextField
                        required
                        margin="normal"
                        fullWidth
                        id="tel"
                        label={t("mistake.description")} // TODO: change label
                        name="tel"
                        autoFocus
                    />
                    <TextField
                        required
                        margin="normal"
                        fullWidth
                        id="profession"
                        label={t("mistake.description")} // TODO: change label
                        name="profession"
                        autoFocus
                        multiline={true}
                    />
                    <Box dir={btnDirection}>
                        <Button variant={"contained"} type="submit">
                            {t("mistake.send")} // TODO: change label
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
