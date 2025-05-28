import type { Metadata } from "next";

import { ThemeProvider } from "next-themes";

import ThemeToggle from "@/components/ThemeToggle";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import DashboardHeader from "@/components/DashboardHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yield Dashboard",
  description: "Find the best yield opportunities across DeFi protocols",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto py-8 px-4 space-y-8">
              <div className="flex justify-end mb-4">
                <ThemeToggle />
              </div>
              <DashboardHeader />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
