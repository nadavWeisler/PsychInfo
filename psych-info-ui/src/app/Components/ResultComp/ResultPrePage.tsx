"use client";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import ResultAccordion from "@/app/Components/ResultComp/ResultAccordion";
import { getContent } from "@/app/firebase/commands";
import { Content, Operator } from "@/app/General/interfaces";

const language = [{ id: "he", display: "he", used: false }];
const operator = Operator.AND;

function ResultsPrePage() {
    const [results, setResults] = useState<Content[]>([]);
    const tags = useSelector((state: any) => state.pagesSlice.tags);
    const organization = useSelector(
        (state: any) => state.pagesSlice.organization
    );

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
            <Typography align="center" variant="h3">
                הנה התוצאות שמצאנו:
            </Typography>
            <br />
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

export default ResultsPrePage;
