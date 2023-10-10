"use client";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Button } from "@mui/material";
import ResultAccordion from "@/app/Components/ResultComp/ResultAccordion";
import { getContent } from "@/app/firebase/commands";
import { Content, Operator } from "@/app/General/interfaces";

const operator = Operator.AND;

function ResultsPrePage() {
    const [results, setResults] = useState<Content[]>([]);
    const tags = useSelector((state: any) => state.pages.tags);
    const organization = useSelector((state: any) => state.pages.organization);
    const language = useSelector((state: any) => state.pages.languages);

    useEffect(() => {
        getContent(tags, organization, language, operator)
            .then((dataFromDB) => {
                setResults(dataFromDB);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Fragment>
            <br />
            <Typography color={"black"} align="center" variant="h3">
                הנה התוצאות שמצאנו:
            </Typography>
            <br />
            {results.map((result, index) => {
                return (
                    <Fragment key={index}>
                        <ResultAccordion
                            title={result.title}
                            link={result.link}
                            tags={result.tags}
                            organization={result.organization}
                            description={result.description}
                            language={result.language}
                            uploader={result.uploader}
                        />
                        <br />
                    </Fragment>
                );
            })}
        </Fragment>
    );
}

export default ResultsPrePage;
