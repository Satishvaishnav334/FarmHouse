import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./Components/CartContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sawariya Novelty - Premium Cosmetics & Novelty Items",
  description: "Your trusted destination for authentic cosmetics, beauty products, and unique novelty items. Shop the latest trends in makeup, skincare, and fun accessories at unbeatable prices.",
  keywords: "cosmetics, makeup, skincare, novelty items, beauty products, lipstick, foundation, accessories",
  openGraph: {
    title: "Sawariya Novelty - Premium Cosmetics & Novelty Items",
    description: "Discover premium cosmetics and unique novelty items at unbeatable prices",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <CartProvider>
            {/* <Navbar></Navbar> */}

            {children}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
