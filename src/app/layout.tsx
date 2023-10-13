import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/[lng]/Components/UI/NavBar";
import AuthProvider from "@/app/[lng]/context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./[lng]/general/styles";
import { Providers } from "@/store/provider";
import { dir } from "i18next";
import { locales } from "@/i18n/settings";

export async function generateStaticParams() {
    return locales.map((lng) => ({ lng }));
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "מידע פסיכולוגי",
    description: "Pshych Info To help you",
};

export default function RootLayout({
    children,
    params: { lng },
}: {
    children: React.ReactNode;
    params: { lng: string };
}) {
    return (
        <html lang={lng} dir={dir(lng)}>
            <body className={inter.className}>
                <ThemeProvider theme={appTheme}>
                    <Navbar />
                    <AuthProvider>
                        <Providers>{children}</Providers>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
