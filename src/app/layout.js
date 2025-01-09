'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProviders from "./hooks/useReactQuery";
import Header from "./component/Header/Header";
import { RecoilRoot } from "recoil";
import { usePriceStore, useSymbolStore } from "./hooks/stateManagement";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "./component/Footer/Footer";

export default function RootLayout({ children }) {
  const { defaultSymbol } = useSymbolStore();
  const { lastPrice } = usePriceStore();
  const router = useRouter();

  useEffect(() => {
    router.push(`/en/trade/${defaultSymbol}`);
  }, [defaultSymbol, router]);

  return (
    <html lang="en">
      <title>{`${lastPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })} | Binance | ${defaultSymbol}`}</title>
      <body>
        <ReactQueryProviders>
          <RecoilRoot>
            <div className="layout">
              <Header />
              <main className="pl-40 pr-40">{children}</main>
              <Footer />
            </div>
          </RecoilRoot>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
