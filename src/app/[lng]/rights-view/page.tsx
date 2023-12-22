"use client";
import React from 'react';
import useTrans from '../hooks/useTrans';
import { LocalizationKeys } from '@/i18n/LocalizationKeys';
import TableView from '../Components/tableView/tableView';
import { Box, Typography } from '@mui/material';
import { rightsViewContainer, rightsViewTitle } from './rightsView.style';


export default function RightsView() {
    const { t, direction } = useTrans();

    const headers = [
        t(LocalizationKeys.RightsView.Headers.Name),
        t(LocalizationKeys.RightsView.Headers.Details)
    ]

    const rows = [
        ["כיוונים - כלי המכוון אותך לזכויות המגיעות לנפגעי ונפגעות ״חרבות ברזל״",
            "https://www.kivunimrights.com/"],
        ["מוקד הכוונה משפית של משרד המשפטים",
            "0733928666"],
        ["הרשת - איחוד הקליניקות המשפטיות בארץ",
            "הרשת - הכוונה משפטית - https://rb.gy/qtf30"],
        ["מוקד מיצוי זכויות למפונים - עיריית ירושלים",
            "0537639873"],
        ["יד מכוונת",
            "*2496"],
        ["אתר כל זכות",
            "אתר כל זכות - https://tinyurl.com/bdf2tetz"],
        ["פתחון לב - מוקד טלפוני",
            "https://www.pitchonlev.org.il/"],
        ["מענק כספי למחוסרי מיגון- אשקלון",
            "מענק כספי - אשקלון - https://did.li/7tgZH]"]
    ];

    return (
        <Box sx={rightsViewContainer}>
            <Typography dir={direction} variant="h4" sx={rightsViewTitle}>
                {t(LocalizationKeys.RightsView.Title)}
            </Typography>
            <TableView headers={headers} rows={rows} />
        </Box>
    )
}