"use client";
import { Fragment, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ResultAccordion from "@/app/Components/ResultComp/ResultAccordion";
import { Content } from "@/app/general/interfaces";

const getResults = () => {
    const data = [
        {
            title: "כותרת",
            link: "https://google.com",
            tags: [
                { id: "טאג1", display: "טאג1", used: false },
                { id: "טאג2", display: "טאג2", used: false },
            ],
            organization: [
                { id: "ארגון1", display: "ארגון1", used: false },
                { id: "ארגון2", display: "ארגון2", used: false },
            ],
            description: "תיאור",
            language: "he",
        },
    ];
    return data as Content[];
};

function ResultsPage() {
    const [results, setResults] = useState<Content[]>([]);
    useEffect(() => {
        const dataFromDB = getResults();
        setResults(dataFromDB);
    }, []);

    // TODO: get results from store
    return (
        <Fragment>
            <Typography variant="h1">תוצאות</Typography>
            {results.map((result) => {
                return (
                    <ResultAccordion
                        title={result.title}
                        link={result.link}
                        tags={result.tags}
                        organization={result.organization}
                        description={result.description}
                        language={result.language}
                    />
                );
            })}
        </Fragment>
    );
}

export default ResultsPage;
