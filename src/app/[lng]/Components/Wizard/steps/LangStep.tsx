import { useState, useEffect, ReactElement } from "react";
import { Box, Button, Chip, Grid, Typography, Alert } from "@mui/material";
import {
    DisplayLanguages,
    LangStepProps,
} from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/Wizard/steps/LangStep.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

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
        <Box sx={styles.root}>
            {isError ? <Alert severity="error">{errorMsg}</Alert> : null}
            <Box sx={styles.secondary}>
                <Typography dir={direction} sx={styles.typ} variant="h4">
                    {t(LocalizationKeys.Wizard.ChooseLanguages)}
                </Typography>
                <Button
                    dir={direction}
                    sx={styles.button}
                    variant="contained"
                    onClick={selectAll}
                >
                    {t(LocalizationKeys.Wizard.ChooseAll)}
                </Button>
                <Button
                    dir={direction}
                    sx={styles.button}
                    variant="contained"
                    onClick={clearSelection}
                >
                    {t(LocalizationKeys.Wizard.Clear)}
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
