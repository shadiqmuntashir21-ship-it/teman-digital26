import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { getSettings } from "@/lib/cms";
import "./globals.css";
import { MotionEnhancer } from "@/components/motion-enhancer";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const seo = settings.seo || {};
  const brand = settings.brand || {};
  return {
    title: seo.title || "KARVA — Ide diwujudkan. Nilai diciptakan.",
    description: seo.description || "Produk digital siap pakai dan solusi custom untuk kebutuhan nyata.",
    applicationName: brand.name || "KARVA",
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
    icons: {
      icon: (brand.iconUrl as string) || "/brand/karva-icon.png",
      apple: (brand.iconUrl as string) || "/brand/karva-icon.png",
    },
    openGraph: {
      title: seo.title || "KARVA — Ide diwujudkan. Nilai diciptakan.",
      description: seo.description || "Produk digital siap pakai dan solusi custom untuk kebutuhan nyata.",
      type: "website",
      siteName: brand.name || "KARVA",
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={manrope.variable}><MotionEnhancer/>{children}</body>
    </html>
  );
}
