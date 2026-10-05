import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { getSettings } from "@/lib/cms";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const seo = settings.seo || {};
  const brand = settings.brand || {};
  return {
    title: seo.title || "Teman Digital — Produk & Solusi Digital",
    description: seo.description || "Produk digital siap pakai dan solusi custom untuk kebutuhan nyata.",
    applicationName: brand.name || "Teman Digital",
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
    openGraph: {
      title: seo.title || "Teman Digital — Produk & Solusi Digital",
      description: seo.description || "Produk digital siap pakai dan solusi custom untuk kebutuhan nyata.",
      type: "website",
      siteName: brand.name || "Teman Digital",
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
