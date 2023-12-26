"use client";
import { useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RedirectingPage() {
    const router = useRouter();
    useEffect(() => {
        router.push("/he/home-page");
    }, []);
    return (
        <Box textAlign="center" sx={{ mt: "40%" }}>
            <CircularProgress size={100} />
        </Box>
    );
}
