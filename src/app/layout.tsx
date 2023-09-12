import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { Icons } from "@/compontents/ui/Icons"
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
      <body className={`${inter.className} text-slate-200 background`}>
        <Providers>
          <Navbar />
          {children}
          <footer className="bg-slate-700 text-slate-300 text-sm flex gap-2 items-center p-2 justify-center mt-8 ">
            <p className="">Strona powstała w celu nauki oraz zabawy.</p>
            <p>
              <a
                href="https://github.com/pecet3"
                className="text-slate-50 font-bold"
              >
                @Jakub Pacewicz
              </a>
              , 2023
            </p>
            <a href="https://discord.gg/jDxBNk6M  className="text-center"><Icons.Discord size={32} className="text-slate-20" >
          Discord społeczności
</a>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
