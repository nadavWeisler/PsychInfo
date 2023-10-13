"use client";
import { useState, useEffect, FormEvent, Fragment } from "react";
import { Box, TextField, Button, Container, CssBaseline } from "@mui/material";
import { useTranslation } from "@/i18n/client";
import { FoundMistake, FoundMistakeFormProps } from "@/app/[lng]/general/interfaces";
import { useParams } from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";
import { postMistakes } from "@/app/[lng]/firebase/commands";

export default function FoundMistakeForm({ isSentHandler }: FoundMistakeFormProps) {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");

    const { lng } = useParams();
    const { t, i18n } = useTranslation(lng as LocaleTypes, "translation");

    useEffect(() => {
        setDirection(i18n.dir());
    }, [i18n.language]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const data: FoundMistake = {
            name,
            emailToContact: email,
            description,
        };

        await postMistakes(data)
            .then(() => {
                isSentHandler();
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    };

    return (
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
                    label={t("email.name")}
                    name="name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label={t("email.email")}
                    name="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="description"
                    label={t("email.description")}
                    name="description"
                    autoFocus
                    onChange={(e) => setDescription(e.target.value)}
                    multiline={true}
                />
                <Button variant={"contained"} type="submit">
                    {t("email.send")}
                </Button>
            </Box>
        </Box>
    );
};