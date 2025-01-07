import React from "react";
import { getBinanceTrades } from "../../utils/fetchBinanceData";
import { useQuery } from "@tanstack/react-query";
import { useSymbolStore } from "../../hooks/stateManagement";

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  }
  return num;
};

const Trades = () => {
  const { defaultSymbol, base, quote } = useSymbolStore();

  const { data: trades } = useQuery({
    queryKey: ["trades", defaultSymbol],
    queryFn: async () => {
      const data = await getBinanceTrades(defaultSymbol);
      return [...data].sort((a, b) => b.time - a.time);
    },
  });

  return (
    <div className="bg-[--background-card] text-white p-4 rounded-lg row-start-3 row-end-5 col-start-3">
      <div className="flex justify-between mb-4">
        <div className="text-sm font-semibold">Market Trades</div>
      </div>

      <div className="text-xs text-gray-400 grid grid-cols-[3fr_2fr_2fr] mb-2 pr-4">
        <div className="text-left">Price ({quote})</div>
        <div className="text-right">Amount ({base})</div>
        <div className="text-right">Time</div>
      </div>

      <div className="space-y-1 max-h-[240px] overflow-y-auto pr-3">
        {trades?.map((trade, index) => (
          <div key={index} className="grid grid-cols-[3fr_2fr_2fr] text-xs">
            <div
              className={trade.isBuyerMaker ? "text-red-500" : "text-green-500"}
            >
              {parseFloat(trade.price)}
            </div>
            <div className="text-right">
              {formatNumber(parseFloat(trade.qty))}
            </div>
            <div className="text-right">
              {new Date(trade.time).toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trades;
