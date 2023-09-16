import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import { Icons } from "../components/ui/Icons";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "𝑝𝓸🅽𝕒𝙧𝙯𝙚𝙠𝙖𝙟.𝖈𝖔𝖒",
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
          <footer className="bg-slate-700 text-slate-300 text-sm flex gap-4 items-center p-2 justify-center mt-8 ">
            <div>
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
            </div>
            <a
              href="https://discord.gg/jDxBNk6M"
              className="text-center text-xs"
            >
              <Icons.Discord
                size={32}
                className="text-slate-50 hover:text-slate-300 duration-300 m-auto"
              />
              Nasz Discord
            </a>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
