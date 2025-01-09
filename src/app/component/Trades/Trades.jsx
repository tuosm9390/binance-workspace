import { getBinanceTradesData } from "../../utils/fetchBinanceData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useOrderFormStore, usePriceStore, useSymbolStore } from "../../hooks/stateManagement";
import { formatNumber, tradeFormatNumber } from "../../utils/formatNumber";
import { useEffect, useState } from "react";
import TabButton from "./components/TabButton";

const Trades = () => {
  const { defaultSymbol, base, quote } = useSymbolStore();
  const { orderForm } = useOrderFormStore();
  const { setLastPrice, setIsBuyMaker } = usePriceStore();
  const [selectedType, setSelectedType] = useState("Market");

  const { data: trades } = useQuery({
    queryKey: ["trades", defaultSymbol],
    queryFn: async () => {
      const data = await getBinanceTradesData(defaultSymbol);
      return [...data].sort((a, b) => b.time - a.time);
    },
  });

  useWebSocketConnection(defaultSymbol);

  useEffect(() => {
    setLastPrice(parseFloat(trades?.[0]?.price));
    setIsBuyMaker(trades?.[0]?.isBuyerMaker);
  }, [trades])

  return (
    <div className="bg-[--background-card] text-white rounded-lg row-start-3 row-end-5 col-start-3 flex flex-col">
      <div className="flex gap-4 mb-4 border-b border-gray-700 p-4 pb-0">
        <TabButton type={"Market"} selectedType={selectedType} setSelectedType={setSelectedType} />
        <TabButton type={"My"} selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>

      {selectedType == "Market" && (
        <>
          <div className="text-xs text-gray-400 grid grid-cols-[3fr_2fr_2fr] mb-2 px-4">
            <div className="text-left">price ({quote})</div>
            <div className="text-right">Amount ({base})</div>
            <div className="text-right">Time</div>
          </div><div className={`flex-1 overflow-y-auto pr-3 gap-1 pl-4 ${orderForm ? "max-h-[415px]" : "max-h-[240px]"}`}>
            {trades?.map((trade, index) => (
              <div key={index} className="grid grid-cols-[3fr_2fr_2fr] text-xs">
                <div
                  className={trade.isBuyerMaker ? "text-[--minus]" : "text-[--plus]"}
                >
                  {parseFloat(trade.price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })}
                </div>
                <div className="text-right">
                  {tradeFormatNumber(parseFloat(trade.qty))}
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
        </>
      )}

      {selectedType == "My" && (
        <div className="text-sm p-4 flex items-center justify-center text-gray-400 h-full">
          <span>
            <span className="text-yellow-400 hover:text-yellow-300">Log In</span>
            {" or "}
            <span className="text-yellow-400 hover:text-yellow-300">Register Now</span>
            {" to trade"}
          </span>
        </div>
      )}
    </div>
  );
};

const useWebSocketConnection = (defaultSymbol) => {
  // 웹소켓 연결
  const queryClient = useQueryClient();
  useEffect(() => {
    const websocket = new WebSocket(`wss://stream.binance.com:9443/ws/${defaultSymbol.toLowerCase()}@aggTrade`);
    websocket.onopen = () => {
      return
    };
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // WebSocket 데이터를 trades 형식으로 변환
      const transformedData = {
        id: data.t,
        isBestMatch: data.M,
        isBuyerMaker: data.m,
        price: data.p,
        qty: data.q,
        quoteQty: (parseFloat(data.p) * parseFloat(data.q)).toString(),
        time: data.T
      };

      // setQueriesData를 setQueryData로 변경
      // setQueriesData: 부분적으로 일치하는 모든 쿼리에 영향
      // setQueryData: 정확히 일치하는 쿼리에만 영향
      queryClient.setQueryData(
        ["trades", defaultSymbol],
        (oldData) => {
          // oldData가 없거나 배열이 아닌 경우 새 배열 생성
          const currentTrades = Array.isArray(oldData) ? oldData : [];
          return [transformedData, ...currentTrades].slice(0, 50); // 최대 50개로 제한
        },
      );
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);
};

export default Trades;
