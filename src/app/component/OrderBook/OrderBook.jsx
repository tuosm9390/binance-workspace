import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getBinanceOrderBookData } from "../../utils/fetchBinanceData";
import OrderBookRow from "./OrderBookRow";
import CurrentPrice from "./CurrentPrice";
import { useOrderFormStore, usePriceStore, useSymbolStore } from "../../hooks/stateManagement";

const OrderBook = () => {
  const { defaultSymbol, base, quote } = useSymbolStore();
  const { setPrice } = usePriceStore();
  const { orderForm } = useOrderFormStore();
  const { lastPrice, isBuyMaker } = usePriceStore();

  const { data: depth } = useQuery({
    queryKey: ["depth", defaultSymbol],
    queryFn: () => getBinanceOrderBookData(defaultSymbol),
  });

  return (
    <div className="bg-[--background-card] text-white py-4 flex flex-col rounded-lg row-start-2 row-end-6 w-full">
      <div className="border-b border-gray-700 pb-2 px-4">
        <div className="text-sm font-semibold">Order Book</div>
      </div>

      <div className="grid grid-cols-[3fr_4fr_3fr] text-xs text-gray-400 mb-2 pt-2 px-4">
        <div className="text-left">Price ({quote})</div>
        <div className="text-right">Amount ({base})</div>
        <div className="text-right">Total</div>
      </div>

      {depth && (
        <>
          {/* Sell Orders */}
          <div className="flex flex-col mb-2 px-4 gap-1">
            {depth.asks?.slice(0, !orderForm ? 17 : 22).reverse().map((ask, index) => (
              <OrderBookRow
                key={`ask-${index}`}
                price={ask[0]}
                amount={ask[1]}
                isAsk={true}
                onClick={setPrice}
              />
            ))}
          </div>

          {/* Current Price */}
          <CurrentPrice
            price={lastPrice}
            isBuyMaker={isBuyMaker}
            dollarPrice={parseFloat(depth?.asks?.[0]?.[0]).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })}
          />

          {/* Buy Orders */}
          <div className="flex flex-col my-2 px-4 gap-1">
            {depth.bids?.slice(0, !orderForm ? 17 : 22).map((bid, index) => (
              <OrderBookRow
                key={`bid-${index}`}
                price={bid[0]}
                amount={bid[1]}
                isAsk={false}
                onClick={setPrice}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderBook;
