"use client";
import { useState, useEffect, FormEvent } from "react";
import { Box, TextField, Button, Container, CssBaseline } from "@mui/material";
import { useTranslation } from "@/i18n/client";
import { FoundMistakeFormProps } from "@/app/[lng]/general/interfaces";
import { useParams } from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";
import { postMistakes } from "@/app/[lng]/firebase/commands";

function FoundMistakeForm({
    isSentHandler = () => null,
}: FoundMistakeFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");

    const { lng } = useParams();
    const { t, i18n } = useTranslation(lng as LocaleTypes, "translation");

    useEffect(() => {
        setDirection(i18n.dir());
    }, [i18n.language]);

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            name,
            emailToContact: email,
            description,
        };
        postMistakes(data)
            .then(() => {
                isSentHandler();
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                        onChange={nameHandler}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label={t("email.email")}
                        name="email"
                        autoFocus
                        onChange={emailHandler}
                    />
                    <TextField
                        required
                        margin="normal"
                        fullWidth
                        id="description"
                        label={t("email.description")}
                        name="description"
                        autoFocus
                        onChange={descriptionHandler}
                        multiline={true}
                    />
                    <Button variant={"contained"} type="submit">
                        {t("email.send")}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default FoundMistakeForm;
