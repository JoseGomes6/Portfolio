import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google"; // Trocámos Geist por Space Mono
import "./globals.css";
import Cursor from "@/components/Cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"], // 700 é o segredo para ser "gorda"
});

export const metadata: Metadata = {
  title: "José Gomes | Portfolio",
  description: "Creative Developer & Designer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceMono.variable} antialiased bg-black text-white`}
      >
        <Cursor />
        {children}
      </body>
    </html>
  );
}
