"use client";
import { Fragment, ReactElement } from "react";
import { Typography, CircularProgress, Box, Container } from "@mui/material";
import ResultAccordion from "@/app/[lng]/Components/ResultComp/ResultAccordion";
import { Content } from "@/app/[lng]/general/interfaces";
import { useAppSelector } from "@/app/[lng]/hooks/redux";
import { RootState } from "@/store";
import { useParams } from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";

export default function ResultsPrePage(): ReactElement {
    const locale = useParams()?.locale as LocaleTypes;
    const { t } = useTranslation(locale, "translation");

    const results: Content[] = useAppSelector((state: RootState) => state.pages.content);

    return (
        <Box
            sx={{
                marginTop: 4,
            }}
        >
            <Typography color={"black"} align="center" variant="h4" margin={"normal"}>
                {t("results.title")}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            ></Box>
            {results && results.map((result, index) => {
                return (
                    <Box
                        sx={{ marginTop: 4 }}
                        key={index}
                    >
                        <ResultAccordion
                            title={result.title}
                            link={result.link}
                            tags={result.tags}
                            organization={result.organization}
                            description={result.description}
                            languageId={result.languageId}
                            uploader={result.uploader}
                        />
                    </Box>
                );
            })}
        </Box>
    );
};