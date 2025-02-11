"use client";

import CandleChart from "../../../component/Chart/CandleChart";
import PriceDisplay from "../../../component/PriceDisplay/PriceDisplay";
import OrderBook from "../../../component/OrderBook/OrderBook";
import Market from "../../../component/Market/Market";
import Trades from "../../../component/Trades/Trades";
import OrderForm from "../../../component/OrderForm/OrderForm";
import MarketActivity from "../../../component/MarketActivity/MarketActivity";
import BasicTable from "../../../component/BasicTable/BasicTable";
import { usePriceStore, useSymbolStore } from "../../../hooks/stateManagement";
import { useWebSocketConnection } from "../../../hooks/useWebSocketConnection";
import { useParams, useRouter } from "next/navigation";
import { useLayoutEffect, useMemo } from "react";

export default function PageClient() {
  const { defaultSymbol } = useSymbolStore();
  const { lastPrice } = usePriceStore();
  const router = useRouter();
  const { symbol } = useParams();

  const activeSymbol = useMemo(
    () => defaultSymbol || symbol,
    [defaultSymbol, symbol]
  );

  useWebSocketConnection(activeSymbol);

  useLayoutEffect(() => {
    if (activeSymbol) {
      router.replace(`/en/trade/${activeSymbol}`);
    }
  }, [activeSymbol, router]);

  return (
    <>
      <title>{`${lastPrice.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 10,
      })} | Binance | ${activeSymbol}`}</title>
      <div className="grid grid-cols-[minmax(253px,320px)_minmax(510px,880px)_minmax(253px,320px)] grid-rows-[56px_360px_160px_minmax(169px,1fr)_minmax(146px,auto)_560px] gap-1 pt-1">
        {/* price display */}
        <PriceDisplay />
        {/* order book */}
        <OrderBook />
        {/* candle chart */}
        <CandleChart />
        {/* Market Tab */}
        <Market />
        {/* Trades Tab */}
        <Trades />
        {/* Order Form Tab */}
        <OrderForm />
        {/* Market Activity Tab */}
        <MarketActivity />
        {/* Basic Table Tab */}
        <BasicTable />
      </div>
    </>
  );
}
