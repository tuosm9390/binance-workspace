import { getBinanceTrades } from "../../utils/fetchBinanceData";
import { useQuery } from "@tanstack/react-query";
import { useOrderFormStore, useSymbolStore } from "../../hooks/stateManagement";
import { formatNumber } from "../../utils/formatNumber";

const Trades = () => {
  const { defaultSymbol, base, quote } = useSymbolStore();
  const { orderForm } = useOrderFormStore();

  const { data: trades } = useQuery({
    queryKey: ["trades", defaultSymbol],
    queryFn: async () => {
      const data = await getBinanceTrades(defaultSymbol);
      return [...data].sort((a, b) => b.time - a.time);
    },
  });

  return (
    <div className="bg-[--background-card] text-white rounded-lg row-start-3 row-end-5 col-start-3 flex flex-col">
      <div className="flex justify-between mb-4 border-b border-gray-700 p-4 pb-2">
        <div className="text-sm font-semibold">Market Trades</div>
      </div>

      <div className="text-xs text-gray-400 grid grid-cols-[3fr_2fr_2fr] mb-2 px-4">
        <div className="text-left">Price ({quote})</div>
        <div className="text-right">Amount ({base})</div>
        <div className="text-right">Time</div>
      </div>

      <div className={`flex-1 overflow-y-auto pr-3 gap-1 pl-4 ${orderForm ? "max-h-[415px]" : "max-h-[240px]"}`}>
        {trades?.map((trade, index) => (
          <div key={index} className="grid grid-cols-[3fr_2fr_2fr] text-xs">
            <div
              className={trade.isBuyerMaker ? "text-[--minus]" : "text-[--plus]"}
            >
              {parseFloat(trade.price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })}
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
