import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Header from "@/components/header/headerComponent";
import Footer from "@/components/footer/footerComponent";
import RevealOnScroll from "@/components/revealOnScroll/revealOnScrollComponent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-16 overflow-x-clip">
        <Header />
        {children}
        <Footer />
        {/* Depois de tudo: os pins das seções já existem quando ele mede as posições */}
        <RevealOnScroll />
      </body>
    </html>
  );
}
