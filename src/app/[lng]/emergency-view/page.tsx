"use client";
import React from "react";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import TableView from "@/app/[lng]/Components/TableView";
import { Box, Typography } from "@mui/material";
import {
    emergencyViewTitle,
    emergencyViewContainer,
} from "@/app/[lng]/emergency-view/page.style";

export default function EmergencyView() {
    const { t, direction } = useTrans();

    const headers = [
        t(LocalizationKeys.EnergencyView.Headers.Name),
        t(LocalizationKeys.EnergencyView.Headers.Details),
    ];

    const rows = [
        ["ער״ן", "*1201"],
        ["נט״ל", "1800363363"],
        ["מרכז סיוע לנפגעות תקיפה מינית - נשים", "*1202"],
        ["מרכז סיוע לנפגעות תקיפה מינית - גברים", "*1203"],
        ["סה״ר - סיוע והקשבה ברשת", "https://sahar.org.il"],
    ];

    return (
        <Box sx={emergencyViewContainer}>
            <Typography dir={direction} variant="h4" sx={emergencyViewTitle}>
                {t(LocalizationKeys.EnergencyView.Title)}
            </Typography>
            <TableView headers={headers} rows={rows} />
        </Box>
    );
}
