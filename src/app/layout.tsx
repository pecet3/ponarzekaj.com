import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import { Icons } from "../components/ui/Icons";
import Link from "next/link";
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
          <footer className="bg-slate-700 text-slate-300 text-sm flex gap-4 items-start p-2 justify-center mt-8 ">
            <div className="flex gap-2 flex-col items-end ml-16">
              <p className="font-mono max-w-md m-auto text-xs">
                Cześć, bardzo mi miło, że odwiedziłeś moją stronę. Powstała ona
                w celu dostarczenia dla Polaków miejsca, gdzie mogą robić, to co
                lubią robić - narzekać. Strona cały czas się rozwija, także
                zachęcam do śledzenia 😎.
              </p>
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
            <Link
              href="https://discord.gg/jDxBNk6M"
              className="text-center text-xs"
            >
              <Icons.Discord
                size={48}
                className="text-slate-50 hover:text-blue-300 duration-300 m-auto"
              />
            </Link>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
