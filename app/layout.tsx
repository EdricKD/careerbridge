import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://careerbridgeghana.com"),
  title: "CareerBridge Ghana",
  description:
    "An AI-powered career operating system helping Ghanaian university students turn intention into opportunity.",
  keywords: [
    "CareerBridge Ghana",
    "student careers Ghana",
    "AI career analysis",
    "job shadowing Ghana",
    "university employability platform",
  ],
  openGraph: {
    title: "CareerBridge Ghana",
    description:
      "A full-stack, AI-powered career operating system for Ghanaian university students, universities, employers, and platform administrators.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
