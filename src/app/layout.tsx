import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardHeader from "@/components/DashboardHeader";

// Font setup
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Yield Dashboard",
  description: "Find the best yield opportunities across DeFi protocols",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen  text-foreground">
            <div className="container max-w-7xl mx-auto py-8 px-4 space-y-8">
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
