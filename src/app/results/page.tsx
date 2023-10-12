"use client";
import { Fragment, useEffect, useState } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import ResultAccordion from "@/app/Components/ResultComp/ResultAccordion";
import { getContent } from "@/app/firebase/commands";
import { Content, Operator } from "@/app/general/interfaces";
import { useAppSelector } from "@/app/hooks/redux";

const operator = Operator.AND;

function ResultsPrePage() {
    const [results, setResults] = useState<Content[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const tags = useAppSelector((state: any) => state.pages.tags);
    const organization = useAppSelector(
        (state: any) => state.pages.organization
    );
    const language = useAppSelector((state: any) => state.pages.languages);

    useEffect(() => {
        setIsLoaded(true);
        getContent(tags, organization, language, operator, setResults);
        setIsLoaded(false);
    }, [tags, organization, language]);

    return (
        <Fragment>
            <br />
            <Typography color={"black"} align="center" variant="h3">
                הנה התוצאות שמצאנו:
            </Typography>
            <br />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {isLoaded && <CircularProgress />}
            </Box>
            {results.map((result, index) => {
                return (
                    <Fragment key={index}>
                        <ResultAccordion
                            title={result.title}
                            link={result.link}
                            tags={result.tags}
                            organization={result.organization}
                            description={result.description}
                            languageId={result.languageId}
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
