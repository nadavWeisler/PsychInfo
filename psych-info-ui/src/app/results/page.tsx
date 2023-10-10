"use client";
import { Fragment, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ResultAccordion from "@/app/Components/ResultComp/ResultAccordion";
import { Content } from "@/app/general/interfaces";
import { useTranslation } from "react-i18next";

const getResults = () => {
    const data = [
        {
            title: "כותרת",
            link: "https://google.com",
            tags: [
                { id: "טאג1", display: "טאג1", used: false },
                { id: "טאג2", display: "טאג2", used: false },
            ],
            organization: { id: "ארגון1", display: "ארגון1", used: false },

            description: "תיאור",
            language: "he",
            uploader: "אני",
        },
    ];
    return data as Content[];
};

export default function ResultsPage() {
    const {t} = useTranslation();
    const [results, setResults] = useState<Content[]>([]);

    useEffect(() => {
        const dataFromDB = getResults();
        setResults(dataFromDB);
    }, []);

    // TODO: get results from store
    return (
        <Fragment>
            <Typography align="center" variant="h3">
                {t("results.title")}
            </Typography>

            {results.map((result) => {
                return (
                    <ResultAccordion
                        title={result.title}
                        link={result.link}
                        tags={result.tags}
                        organization={result.organization}
                        description={result.description}
                        language={result.language}
                        uploader={result.uploader}
                    />
                );
            })}
        </Fragment>
    );
}