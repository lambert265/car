import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import LiveChat from "@/components/LiveChat";
import CompareBar from "@/components/CompareBar";
import { WishlistProvider } from "@/lib/wishlist";
import { AuthProvider } from "@/lib/auth";
import { CartProvider } from "@/lib/cart";
import { ToastProvider } from "@/lib/toast";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "LUXE Motors — Premium Automotive",
    template: "%s | LUXE Motors",
  },
  description: "Over 200 certified luxury vehicles. Transparent pricing. White-glove service since 2008. Browse our collection of premium SUVs, sedans, sports cars, and electric vehicles.",
  keywords: ["luxury cars", "premium vehicles", "exotic cars", "sports cars", "SUVs", "electric vehicles", "car dealership", "certified pre-owned"],
  authors: [{ name: "LUXE Motors" }],
  creator: "LUXE Motors",
  publisher: "LUXE Motors",
  metadataBase: new URL("https://car-sandy-pi.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://car-sandy-pi.vercel.app",
    title: "LUXE Motors — Premium Automotive",
    description: "Over 200 certified luxury vehicles. Transparent pricing. White-glove service since 2008.",
    siteName: "LUXE Motors",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXE Motors — Premium Automotive",
    description: "Over 200 certified luxury vehicles. Transparent pricing. White-glove service since 2008.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
            <ToastProvider />
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
            <LiveChat />
            <CompareBar />
        </WishlistProvider>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
