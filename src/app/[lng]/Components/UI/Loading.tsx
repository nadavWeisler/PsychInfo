import { CircularProgress, Box } from "@mui/material";

export default function Loading() {
    return (
        <Box textAlign="center" sx={{ mt: "40%" }}>
            <CircularProgress size={100} />
        </Box>
    )
}