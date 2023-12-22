import {Select, MenuItem, SelectChangeEvent, Typography} from"@mui/material"
import { addresses } from "./res";

interface SelectStepProps {
    handleAddress: (event: SelectChangeEvent) => void;
    address: string;
    currentOrOrigin: 'current' | 'origin'; 
}

export default function SelectStep({handleAddress, address, currentOrOrigin}: SelectStepProps) {
    return (
      <>
      <Typography variant="h6">
        {currentOrOrigin === 'current' ? 'מהו מקום המגורים הנוכחי שלך?' : 'מהו מקום המגורים שלך בשגרה?'}
      </Typography>
        <Select
        value={address}
        label="כתובת"
        onChange={handleAddress}
      >{addresses.sort().map((address, index) => (
        <MenuItem key={index} value={address}>{address}</MenuItem>
        ))}
      </Select>
      </>
    )
}