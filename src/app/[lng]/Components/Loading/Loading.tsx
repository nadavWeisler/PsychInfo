import { CircularProgress, Box } from "@mui/material";
import { styles } from "@/app/[lng]/Components/Loading/Loading.style";

export default function Loading() {
    return (
        <Box textAlign="center" sx={styles.box}>
            <CircularProgress size={100} />
        </Box>
    );
}
