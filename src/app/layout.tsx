import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

import { ThemeProvider } from "./theme/theme-provider";
import Navbar from "@/Components/Navbar";
import SearchWrapper from "@/Components/SearchWrapper";
import Header from "@/Components/Header";


const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "IMDb Clone — Discover Movies & TV Shows",
  description: "Your ultimate destination for discovering trending movies, top-rated TV shows, and curated daily picks.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
        <Providers>
          <Header />
          <Navbar/>
          <SearchWrapper/>
          {children}
        </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
