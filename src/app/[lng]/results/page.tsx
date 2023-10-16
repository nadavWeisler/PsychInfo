"use client";
import { ReactElement } from "react";
import { Typography, Box } from "@mui/material";
import { Content } from "@/app/[lng]/general/interfaces";
import { useAppSelector } from "@/app/[lng]/hooks/redux";
import { RootState } from "@/store";
import useTrans from "@/app/[lng]/hooks/useTrans";
import CustomAccordion from "@/app/[lng]/Components/ResultComp/CustomAccordion";

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
                {t("results.title")}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            ></Box>
            {results && (
                <Box sx={{ mt: "5%" }}>
                    <CustomAccordion data={results} />
                </Box>
            )}
        </Box>
    );
}
