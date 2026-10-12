import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0D0D0D",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://trendora.alakode"),
  title: "TRENDORA — Kids Cloth Hub | Opp. NSS School, Alakode",
  description:
    "Timeless children's clothing crafted from 100% organic fabrics. Designed to last. Visit us Opp. NSS School, Alakode.",
  openGraph: {
    title: "TRENDORA — Kids Cloth Hub",
    description: "Timeless children's clothing crafted from 100% organic fabrics.",
    images: ["/hero-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
