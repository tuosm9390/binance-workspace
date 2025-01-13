"use client";

import CandleChart from "../../../component/Chart/CandleChart";
import PriceDisplay from "../../../component/PriceDisplay/PriceDisplay";
import OrderBook from "../../../component/OrderBook/OrderBook";
import Market from "../../../component/Market/Market";
import Trades from "../../../component/Trades/Trades";
import OrderForm from "../../../component/OrderForm/OrderForm";
import MarketActivity from "../../../component/MarketActivity/MarketActivity";
import BasicTable from "../../../component/BasicTable/BasicTable";
import { useSymbolStore } from "../../../hooks/stateManagement";
import { useWebSocketConnection } from "../../../hooks/useWebSocketConnection";

function page() {
  const { defaultSymbol } = useSymbolStore();

  useWebSocketConnection(defaultSymbol);

  return (
    <div className="grid grid-cols-[minmax(253px,320px)_minmax(510px,880px)_minmax(253px,320px)] grid-rows-[56px_360px_160px_minmax(169px,1fr)_minmax(146px,auto)_560px] gap-1 pt-1">
      <>
        {/* price display */}
        <PriceDisplay symbol={defaultSymbol} />
        {/* order book */}
        <OrderBook symbol={defaultSymbol} />
        {/* candle chart */}
        <CandleChart symbol={defaultSymbol} />
        {/* Market Tab */}
        <Market symbol={defaultSymbol} />
        {/* Trades Tab */}
        <Trades symbol={defaultSymbol} />
        {/* Order Form Tab */}
        <OrderForm symbol={defaultSymbol} />
        {/* Market Activity Tab */}
        <MarketActivity symbol={defaultSymbol} />
        {/* Basic Table Tab */}
        <BasicTable symbol={defaultSymbol} />
      </>
    </div>
  );
}



export default page;
