import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/core/Navbar";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "./StoreProvider";
import { ConditionalFooter } from "@/components/ui/core/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "Grand Villia",
  description: "Luxury stay in Langgur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >

          <Navbar />

          {children}
          <Toaster />
        <ConditionalFooter/>
        </body>
      </StoreProvider>
    </html>
  );
}
