import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import LiveChat from "@/components/LiveChat";
import CompareBar from "@/components/CompareBar";
import { WishlistProvider } from "@/lib/wishlist";
import { CompareProvider } from "@/lib/compare";
import { AuthProvider } from "@/lib/auth.tsx";
import { CartProvider } from "@/lib/cart";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "LUXE Motors — Premium Automotive",
  description: "Over 200 certified luxury vehicles. Transparent pricing. White-glove service since 2008.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className={`${dmSans.variable} font-sans`} suppressHydrationWarning>
        <AuthProvider>
        <CartProvider>
        <WishlistProvider>
          <CompareProvider>
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
            <LiveChat />
            <CompareBar />
          </CompareProvider>
        </WishlistProvider>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
