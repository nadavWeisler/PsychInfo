import { TableBody, TableCell, TableRow } from "@mui/material";
import { TableViewBodyProps } from "@/app/[lng]/general/interfaces";
import { styles } from "@/app/[lng]/Components/TableViewBody/TableViewBody.style";

export default function TableViewBody({ rows }: TableViewBodyProps) {
    return (
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
    );
}
