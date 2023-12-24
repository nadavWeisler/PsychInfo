"use client";
import { TableContainer, Paper, Table } from "@mui/material";
import { styles } from "@/app/[lng]/Components/TableView/TableView.style";
import { TableViewProps } from "@/app/[lng]/general/interfaces";
import TableViewHead from "@/app/[lng]/Components/TableViewHead";
import TableViewBody from "@/app/[lng]/Components/TableViewBody";

export default function TableView({ headers, rows }: TableViewProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={styles.table} aria-label="simple table">
                <TableViewHead headers={headers} />
                <TableViewBody rows={rows} />
            </Table>
        </TableContainer>
    );
}
