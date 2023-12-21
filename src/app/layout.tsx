import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/app/[lng]/context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./[lng]/general/styles";
import { Providers } from "@/store/provider";
import { dir } from "i18next";
import { locales } from "@/i18n/settings";
import { Container } from "@mui/material";
import dynamic from "next/dynamic";

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

const NavbarNoSSr = dynamic(() => import("./[lng]/Components/UI/NavBar"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PsychInfo",
  description: "ריכוז תוכן להתמודדות נפשית בשעת חירום",
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
          <NavbarNoSSr />
          <Container component="main" maxWidth="xl">
            <AuthProvider>
              <Providers>{children}</Providers>
            </AuthProvider>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
