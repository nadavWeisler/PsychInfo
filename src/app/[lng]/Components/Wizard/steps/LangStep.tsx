import { useState, useEffect, Fragment, ReactElement } from "react";
import { Chip, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DisplayLanguages } from "@/app/[lng]/general/interfaces";

interface LangStepProps {
    updateSelectedLangs: (newTags: string[]) => void;
}

export default function LangStep({ updateSelectedLangs }: LangStepProps): ReactElement {
    const { t } = useTranslation();
    const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
    const [displayLangs, setDisplayLangs] = useState<string[]>([]);

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
                sx={{ marginBottom: "20px", marginTop: "20px" }}
                variant="h4"
            >
                {t("wizard.choose_langueges")}
            </Typography>
            <Grid container spacing={2}>
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