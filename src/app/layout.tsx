// File: src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalLayout from "../components/layout/GlobalLayout";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APOS Restaurant",
  description: "The Future of Restaurant Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <GlobalLayout>{children}</GlobalLayout>
          <ThemeSwitcher />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
