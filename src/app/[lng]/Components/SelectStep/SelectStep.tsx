import { Select, MenuItem, Typography } from "@mui/material";
import { addresses } from "@/app/[lng]/general/resources";
import { SelectStepProps } from "@/app/[lng]/general/interfaces";

export default function SelectStep({
    handleAddress,
    address,
    currentOrOrigin,
}: SelectStepProps) {
    return (
        <>
            <Typography variant="h6">
                {currentOrOrigin === "current"
                    ? "מהו מקום המגורים הנוכחי שלך?"
                    : "מהו מקום המגורים שלך בשגרה?"}
            </Typography>
            <Select value={address} label="כתובת" onChange={handleAddress}>
                {addresses.sort().map((address, index) => (
                    <MenuItem key={index} value={address}>
                        {address}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}
