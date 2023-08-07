import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ponarzekaj.com",
  description: "strona na której możesz ponarzekać",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${inter.className} text-slate-800 dark:text-slate-200 background`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
