import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pyramid Vaastu Yantra",
    template: "%s | Pyramid Vaastu Yantra",
  },
  description:
    "Premium Vaastu advisory, geopathic stress assessment, and handcrafted pyramid yantras — rooted in Nepali tradition.",
  icons: {
    icon: "/images/favicon-32.png",
    apple: "/images/favicon-128.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg-deep font-sans text-ivory-text">
        <NavBar />
        {/*
         * Phase 2 note: the homepage hero is full-bleed under the transparent nav,
         * so homepage page.tsx starts at the very top (no top padding here).
         * All other pages add pt-20 or pt-24 themselves to clear the fixed nav.
         */}
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
