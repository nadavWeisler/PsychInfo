"use client";
import { ReactElement } from "react";
import { Typography, Box } from "@mui/material";
import ResultAccordion from "@/app/[lng]/Components/ResultComp/ResultAccordion";
import { Content } from "@/app/[lng]/general/interfaces";
import { useAppSelector } from "@/app/[lng]/hooks/redux";
import { RootState } from "@/store";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function ResultsPrePage(): ReactElement {
    const results: Content[] = useAppSelector(
        (state: RootState) => state.pages.content
    );
    const { t } = useTrans();

    return (
        <Box sx={{marginTop: 4}}>
            <Typography
                color={"black"}
                align="center"
                variant="h4"
                margin={"normal"}
            >
                {t("results.title")}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            ></Box>
            {results &&
                results.map((result, index) => {
                    return (
                        <Box sx={{ marginTop: 4 }} key={index}>
                            <ResultAccordion
                                title={result.title}
                                link={result.link}
                                tags={result.tags}
                                organization={result.organization}
                                description={result.description}
                                languageId={result.languageId}
                                uploader={result.uploader}
                                id={result.id}
                            />
                        </Box>
                    );
                })}
        </Box>
    );
}
