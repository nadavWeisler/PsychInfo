import { useState, useEffect, ReactElement } from "react";
import { Box, Button, Chip, Grid, Typography, Alert } from "@mui/material";
import {
    DisplayLanguages,
    LangStepProps,
} from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function LangStep({
    updateSelectedLangs,
    isError,
    errorMsg,
}: LangStepProps): ReactElement {
    const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
    const [displayLangs, setDisplayLangs] = useState<string[]>([]);
    const { t, direction } = useTrans();

    useEffect(() => {
        updateSelectedLangs(selectedLangs);
    }, [selectedLangs]);

    function handleChoice(lang: string): void {
        if (selectedLangs.includes(lang)) {
            selectedLangs.splice(selectedLangs.indexOf(lang), 1);
            setSelectedLangs([...selectedLangs]);
            setDisplayLangs(
                selectedLangs.map(
                    (currentLang) =>
                        DisplayLanguages[
                            currentLang as keyof typeof DisplayLanguages
                        ]
                )
            );
        } else {
            setSelectedLangs([...selectedLangs, lang]);
            setDisplayLangs([
                ...displayLangs,
                DisplayLanguages[lang as keyof typeof DisplayLanguages],
            ]);
        }
    }

    function selectAll(): void {
        setSelectedLangs(Object.keys(DisplayLanguages));
        setDisplayLangs(Object.values(DisplayLanguages));
    }

    function clearSelection(): void {
        setSelectedLangs([]);
        setDisplayLangs([]);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {isError ? <Alert severity="error">{errorMsg}</Alert> : null}
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                    dir={direction}
                    sx={{ marginBottom: "20px", marginTop: "20px" }}
                    variant="h4"
                >
                    {t("wizard.choose_languages")}
                </Typography>
                <Button
                    dir={direction}
                    sx={{ margin: "20px" }}
                    variant="contained"
                    onClick={selectAll}
                >
                    {t("wizard.choose_all")}
                </Button>
                <Button
                    dir={direction}
                    sx={{ margin: "20px" }}
                    variant="contained"
                    onClick={clearSelection}
                >
                    {t("wizard.clear")}
                </Button>
            </Box>
            <Grid dir={direction} container spacing={2}>
                {Object.keys(DisplayLanguages).map((lang) => (
                    <Grid item key={lang}>
                        <Chip
                            key={lang}
                            label={
                                DisplayLanguages[
                                    lang as keyof typeof DisplayLanguages
                                ]
                            }
                            onClick={() => handleChoice(lang)}
                            variant={
                                selectedLangs.includes(lang)
                                    ? "filled"
                                    : "outlined"
                            }
                            color="primary"
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
