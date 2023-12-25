"use client";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import TableView from "@/app/[lng]/Components/TableView";
import { Box, Typography } from "@mui/material";
import { rightsViewRows } from "@/app/[lng]/general/resources";
import { styles } from "@/app/[lng]/rights-view/page.style";

export default function RightsView() {
    const { t, direction } = useTrans();

    const headers = [
        t(LocalizationKeys.RightsView.Headers.Name),
        t(LocalizationKeys.RightsView.Headers.Details),
    ];

    return (
        <Box sx={styles.container}>
            <Typography dir={direction} variant="h4" sx={styles.title}>
                {t(LocalizationKeys.RightsView.Title)}
            </Typography>
            <TableView headers={headers} rows={rightsViewRows} />
        </Box>
    );
}
