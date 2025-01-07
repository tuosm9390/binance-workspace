import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getBinanceDepth } from "../../utils/fetchBinanceData";
import { useOrderFormStore, usePriceStore, useSymbolStore } from "../../hooks/stateManagement";
import { formatNumber } from "../../utils/formatNumber";

const OrderBook = () => {
  const { defaultSymbol, base, quote } = useSymbolStore();
  const { setPrice } = usePriceStore();
  const { orderForm } = useOrderFormStore();

  const { data: depth } = useQuery({
    queryKey: ["depth", defaultSymbol],
    queryFn: () => getBinanceDepth(defaultSymbol),
    select: (data) => ({
      ...data,
    })
  });

  // NaN 표시 방지
  useEffect(() => {
    const bidPrice = depth?.bids?.[0]?.[0];
    if (bidPrice) {
      const parsedPrice = parseFloat(bidPrice);
      if (!isNaN(parsedPrice)) {
        setPrice(parsedPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 }));
      } else {
        setPrice("");
      }
    } else {
      setPrice("");
    }
  }, [depth]);

  return (
    <div className="bg-[--background-card] text-white py-4 flex flex-col rounded-lg row-start-2 row-end-6 w-full">
      <div className=" border-b border-gray-700 pb-2 px-4">
        <div className="text-sm font-semibold">Order Book</div>
      </div>
      {/* Headers */}
      <div className="grid grid-cols-[3fr_4fr_3fr] text-xs text-gray-400 mb-2 pt-2 px-4">
        <div className="text-left">Price ({quote})</div>
        <div className="text-right">Amount ({base})</div>
        <div className="text-right">Total</div>
      </div>

      {depth && (
        <>
          {/* Sell Orders (Red) */}
          <div className="flex flex-col mb-4 px-4 gap-1">
            {depth?.asks?.slice(0, !orderForm ? 17 : 22).reverse().map((ask, index) => (
              <div key={`ask-${index}`} className="grid grid-cols-[3fr_4fr_3fr] hover:bg-gray-800 text-xs"
                onClick={() => setPrice(parseFloat(ask[0]))}
              >
                <div className="text-[--minus] text-left">{parseFloat(ask[0])}</div>
                <div className="text-right">{formatNumber(parseFloat(ask[1]))}</div>
                <div className="text-right">{formatNumber(parseFloat(ask[0]) * parseFloat(ask[1]))}</div>
              </div>
            ))}
          </div>

          {/* Current Price */}
          <div className="flex gap-2 font-semibold text-2xl px-4">
            <div className="flex items-end text-[--plus]">{parseFloat(depth?.bids?.[0]?.[0]).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })}</div>
            <div className="flex items-end text-gray-500 text-xs">${parseFloat(depth?.asks?.[0]?.[0]).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })}</div>
          </div>

          {/* Buy Orders (Green) */}
          <div className="flex flex-col my-4 px-4 gap-1">
            {depth?.bids?.slice(0, !orderForm ? 17 : 22).map((bid, index) => (
              <div key={`bid-${index}`} className="grid grid-cols-[3fr_4fr_3fr] hover:bg-gray-800 text-xs"
                onClick={() => setPrice(parseFloat(bid[0]))}
              >
                <div className="text-[--plus] text-left">{parseFloat(bid[0])}</div>
                <div className="text-right">{formatNumber(parseFloat(bid[1]))}</div>
                <div className="text-right">{formatNumber(parseFloat(bid[0]) * parseFloat(bid[1]))}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderBook;
