"use client";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

interface TableViewProps {
    headers: string[];
    rows: string[][];
}

export default function TableView({ headers, rows }: TableViewProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, textAlignLast: "center" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
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
    )
}
