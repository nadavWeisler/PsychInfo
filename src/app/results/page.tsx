"use client";
import { Fragment, useEffect, useState } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import ResultAccordion from "@/app/Components/ResultComp/ResultAccordion";
import { getContent } from "@/app/firebase/commands";
import { Content, Operator } from "@/app/general/interfaces";
import { useAppSelector } from "@/app/hooks/redux";
import { RootState } from "@/store";

const operator = Operator.AND;

function ResultsPrePage() {
    const results = useAppSelector((state: RootState) => state.pages.content);

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
            </Box>
            {false && (<CircularProgress />)}
            {results && results.map((result, index) => {
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
