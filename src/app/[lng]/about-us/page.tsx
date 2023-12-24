"use client";
import { Container } from "@mui/material";
import { styles } from "@/app/[lng]/about-us/page.style";
import AboutUsTexts from "@/app/[lng]/Components/AboutUsTexts";
import AboutUsCard from "@/app/[lng]/Components/AboutUsCard";

export default function AboutUs() {
    return (
        <Container sx={styles.container}>
            <AboutUsTexts />
            <AboutUsCard />
        </Container>
    );
}
