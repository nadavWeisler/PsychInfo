"use client";
import { useEffect } from "react";
import { Typography, Link, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RedirectingPage() {
    const router = useRouter();
    useEffect(() => {
        router.push("/he/home-page");
    }, []);
    return (
        <Box textAlign="center" sx={{ mt: "25%" }}>
            <Typography variant="h2" color="black">
                ...Redirecting
            </Typography>
            <br />
            <Typography variant="h4" color="black" align="center">
                If you are not redirected automatically, follow this
                <br />
                <Link href="/he/home-page">link</Link>
            </Typography>
        </Box>
    );
}
