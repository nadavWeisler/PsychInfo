"use client";
import { ReactElement } from "react";
import { Typography, Box } from "@mui/material";
import { Content } from "@/app/[lng]/general/interfaces";
import { useAppSelector } from "@/app/[lng]/hooks/redux";
import { RootState } from "@/store";
import useTrans from "@/app/[lng]/hooks/useTrans";
import CustomAccordion from "@/app/[lng]/Components/ResultComp/CustomAccordion";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function ResultsPrePage(): ReactElement {
    const results: Content[] = useAppSelector(
        (state: RootState) => state.pages.content
    );
    const { t } = useTrans();

    return (
        <Box sx={{ marginTop: 4 }}>
            <Typography
                color={"black"}
                align="center"
                variant="h4"
                margin={"normal"}
            >
                {t(LocalizationKeys.Results.Title)}
            </Typography>
            {results ? (
                <Box sx={{ mt: "5%" }}>
                    <CustomAccordion data={results} />
                </Box>
            ) : (
                <Typography
                    color={"black"}
                    align="center"
                    variant="h4"
                    margin={"normal"}
                >
                    {t(LocalizationKeys.Results.NoResults)}
                </Typography>
            )}
        </Box>
    );
}
