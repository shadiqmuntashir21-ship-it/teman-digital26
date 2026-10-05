import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Teman Digital — Produk & Solusi Digital",
  description: "Produk digital siap pakai dan solusi custom untuk kebutuhan nyata.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
