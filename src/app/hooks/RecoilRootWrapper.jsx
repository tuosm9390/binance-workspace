"use client";

import { RecoilRoot, useRecoilValue } from 'recoil';
import { defaultSymbolState } from './stateManagement';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Head from 'next/head';

export default function RecoilRootWrapper({ children }) {
  const defaultSymbol = useRecoilValue(defaultSymbolState);
  const router = useRouter();

  useEffect(() => {
    if (defaultSymbol.state === 'hasValue') {
      router.push(`/en/trade/${defaultSymbol.contents}`);
    }
  }, [defaultSymbol, router]);

  return (
    <>
      <RecoilRoot>
        <Head>
          <title>{`Binance | ${defaultSymbol.contents || ''}`}</title>
        </Head>
        {children}
      </RecoilRoot>
    </>
  );
}
