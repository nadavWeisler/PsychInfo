"use client";
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { styles } from "@/app/[lng]/Components/TableView/TableView.style";
import { TableViewProps } from "@/app/[lng]/general/interfaces";

export default function TableView({ headers, rows }: TableViewProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={styles.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index} sx={styles.tableRow}>
                            {row.map((cell) => (
                                <TableCell component="th" scope="row">
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
