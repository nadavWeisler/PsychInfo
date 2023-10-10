import { useState, useEffect, Fragment } from "react";
import { Chip, Grid, Typography } from "@mui/material";
import { Language, Tag } from "@/app/general/interfaces";
import { GetAllDisplays, ListContainsById } from "@/app/general/utils";
import { useTranslation } from "react-i18next";

interface LangStepProps {
    langs: Tag[];
    updateSelectedLangs: (newTags: Tag[]) => void;
}

export default function LangStep({ langs, updateSelectedLangs }: LangStepProps) {
    const { t } = useTranslation();
    const [selectedLangs, setSelectedLangs] = useState<Language[]>([]);
    const [displayLangs, setDisplayLangs] = useState<string[]>([]);

    const handleChoice = (lang: Language) => {
        if (ListContainsById(selectedLangs, lang.id)) {
            const index = selectedLangs.indexOf(lang);
            selectedLangs.splice(index, 1);
            setSelectedLangs([...selectedLangs]);
            setDisplayLangs(GetAllDisplays(selectedLangs));
        } else {
            setSelectedLangs([...selectedLangs, lang]);
            setDisplayLangs([...displayLangs, lang.display]);
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
                {t("wizard.choose_tags")}
            </Typography>
            <Grid container spacing={2}>
                {langs.map((lang) => (
                    <Grid item key={lang.id}>
                        <Chip
                            key={lang.id}
                            label={lang.display}
                            onClick={() => handleChoice(lang)}
                            variant={
                                ListContainsById(selectedLangs, lang.id) ? "filled" : "outlined"
                            }
                            color="primary"
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );  
}