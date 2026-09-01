import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cloudinaryUrl } from "@/lib/cloudinary-url";
import { getContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent();

  const keywords = seo.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const metadata: Metadata = {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: keywords.length > 0 ? keywords : undefined,
  };

  if (seo.faviconPublicId) {
    const faviconUrl = cloudinaryUrl(seo.faviconPublicId, "f_auto,q_auto,w_64,h_64,c_fit");
    metadata.icons = { icon: faviconUrl, shortcut: faviconUrl, apple: faviconUrl };
  }

  if (seo.ogImagePublicId) {
    const ogUrl = cloudinaryUrl(seo.ogImagePublicId, "f_auto,q_auto,w_1200,h_630,c_fill");
    metadata.openGraph = {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    };
    metadata.twitter = {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [ogUrl],
    };
  }

  return metadata;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
