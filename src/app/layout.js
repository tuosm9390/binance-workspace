'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProviders from "./hooks/useReactQuery";
import Header from "./component/Header/Header";
import { RecoilRoot } from "recoil";
import { useSymbolStore } from "./hooks/stateManagement";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { defaultSymbol } = useSymbolStore();
  const router = useRouter();

  useEffect(() => {
    router.push(`/en/trade/${defaultSymbol}`);
  }, [defaultSymbol, router]);

  return (
    <html lang="en">
      <title>{`Binance | ${defaultSymbol}`}</title>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProviders>
          <RecoilRoot>
            <div className="layout">
              <Header />
              <main className="pl-40 pr-40">{children}</main>
            </div>
          </RecoilRoot>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
