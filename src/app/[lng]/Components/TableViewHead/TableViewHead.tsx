import { TableHead, TableRow, TableCell } from "@mui/material";
import { TableViewHeadProps } from "@/app/[lng]/general/interfaces";

export default function TableViewHead({ headers }: TableViewHeadProps) {
    return (
        <TableHead>
            <TableRow>
                {headers.map((header) => (
                    <TableCell>{header}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
