"use client";
import { Fragment } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import ResultAccordion from "@/app/[lng]/Components/ResultComp/ResultAccordion";
import { Content } from "@/app/[lng]/general/interfaces";
import { useAppSelector } from "@/app/[lng]/hooks/redux";
import { RootState } from "@/store";

function ResultsPrePage() {
    const results: Content[] = useAppSelector(
        (state: RootState) => state.pages.content
    );

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
            ></Box>
            {false && <CircularProgress />}
            {results &&
                results.map((result, index) => {
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
                                id={result.id}
                            />
                            <br />
                        </Fragment>
                    );
                })}
        </Fragment>
    );
}

export default ResultsPrePage;
