'use client'

import "./globals.css";
import ReactQueryProviders from "./hooks/useReactQuery";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import { RecoilRoot } from "recoil";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
