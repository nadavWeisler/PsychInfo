import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/Components/UI/NavBar";
import AuthProvider from "@/app/context/AuthContext";

import "../i18n/config";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./general/styles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "מידע פסיכולוגי",
    description: "Pshych Info To help you",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
            <ThemeProvider theme={appTheme}>
                <Navbar />
                <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
            </body>
        </html>
    );
}
