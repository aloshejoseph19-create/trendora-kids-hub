import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Trendora Kids Hub | Organic Childrenswear, Wooden Toys & Baby Essentials",
  description:
    "Discover minimal yet vibrant organic cotton dresses, non-toxic heirloom wooden toys, and everyday playtime essentials for babies, toddlers, and kids.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-brand-yellow/30 selection:text-slate-900">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
