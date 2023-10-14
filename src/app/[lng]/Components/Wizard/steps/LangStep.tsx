import { useState, useEffect, Fragment, ReactElement } from "react";
import { Chip, Grid, Typography } from "@mui/material";
import { DisplayLanguages } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";

interface LangStepProps {
    updateSelectedLangs: (newTags: string[]) => void;
}

export default function LangStep({ updateSelectedLangs }: LangStepProps): ReactElement {
    const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
    const [displayLangs, setDisplayLangs] = useState<string[]>([]);

    const { t, direction } = useTrans();

    const handleChoice = (lang: string) => {
        if (selectedLangs.includes(lang)) {
            const index = selectedLangs.indexOf(lang);
            selectedLangs.splice(index, 1);
            setSelectedLangs([...selectedLangs]);
            setDisplayLangs(selectedLangs.map((currentLang) => DisplayLanguages[currentLang as keyof typeof DisplayLanguages]));
        } else {
            setSelectedLangs([...selectedLangs, lang]);
            setDisplayLangs([...displayLangs, DisplayLanguages[lang as keyof typeof DisplayLanguages]]);
        }
    };

    useEffect(() => {
        updateSelectedLangs(selectedLangs);
    }, [selectedLangs]);

    return (
        <Fragment>
            <Typography
            dir={direction}
                sx={{ marginBottom: "20px", marginTop: "20px" }}
                variant="h4"
            >
                {t("wizard.choose_langueges")}
            </Typography>
            <Grid  dir={direction} container spacing={2}>
                {Object.keys(DisplayLanguages).map((lang) => (
                    <Grid item key={lang}>
                        <Chip
                            key={lang}
                            label={DisplayLanguages[lang as keyof typeof DisplayLanguages]}
                            onClick={() => handleChoice(lang)}
                            variant={
                                selectedLangs.includes(lang) ? "filled" : "outlined"
                            }
                            color="primary"
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );  
}