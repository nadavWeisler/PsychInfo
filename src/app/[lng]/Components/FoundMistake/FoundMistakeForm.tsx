"use client";
import { useState, FormEvent, use, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import {
    FoundMistake,
    FoundMistakeFormProps,
} from "@/app/[lng]/general/interfaces";
import { postMistakes } from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function FoundMistakeForm({
    isSentHandler,
}: FoundMistakeFormProps) {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [btnDirection, setBtnDirection] = useState<"ltr" | "rtl">("ltr");

    const { t, direction } = useTrans();

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
    }

    useEffect(() => {
        if (direction === "rtl") setBtnDirection("ltr");
        else setBtnDirection("rtl");
    }, [direction]);

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
                    label={t("mistake.name")}
                    name="name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label={t("mistake.email")}
                    name="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="description"
                    label={t("mistake.description")}
                    name="description"
                    autoFocus
                    onChange={(e) => setDescription(e.target.value)}
                    multiline={true}
                />
                <Box dir={btnDirection}>
                    <Button variant={"contained"} type="submit">
                        {t("mistake.send")}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
