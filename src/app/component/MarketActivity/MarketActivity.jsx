import Link from "next/link";
import React, { useState } from "react";
import { useWebSocketAbnormalTradingNoticesConnection } from "../../hooks/useWebSocketConnection";
import { useQuery } from "@tanstack/react-query";
import { fetchAbnormalTradingNotices } from "../../utils/fetchBinanceData";
import { MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown } from "react-icons/md";

const MarketActivity = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ["abnormalTradingNotices"],
    queryFn: () => fetchAbnormalTradingNotices(),
  });

  useWebSocketAbnormalTradingNoticesConnection();

  return (
    <div className="bg-[--background-card] text-white rounded-lg row-start-5 row-end-6 col-start-3 flex flex-col">
      <div className="flex justify-between mb-4 border-b border-gray-700 p-4 pb-0">
        <div className="flex gap-2">
          <div className="items-center text-sm font-semibold pb-2">
            Top Movers
          </div>

          <Link href="https://www.binance.com/support/faq/18c97e8ab67a4e1b824edd590cae9f16" target="_blank" className="flex flex-col items-center text-sm font-normal text-gray-400 underline pb-2">
            FAQ
          </Link>
        </div>

        <div className="cursor-pointer text-gray-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <MdKeyboardDoubleArrowUp /> : <MdKeyboardDoubleArrowDown />}
        </div>
      </div>

      <div className="text-xs text-gray-400 grid mb-2 px-4 overflow-y-auto gap-1">
        <div className={`grid gap-2 ${!isOpen ? "max-h-[77px]" : "max-h-[200px]"} transition-all duration-300`}>
          {data?.slice(0, 10).map((item, index) => (
            <div key={index} className="grid grid-cols-[3fr_3fr_1fr] text-xs items-center">
              <div>
                <div className="text-left text-white">
                  {item.baseAsset + "/" + item.quotaAsset}
                </div>
                <div className="text-left">
                  {new Date(item.updateTimestamp || item.sendTimestamp).toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </div>
              </div>

              <div>
                <div className={`text-right ${item.priceChange < 0 ? "text-[--minus]" : "text-[--plus]"}`}>
                  {(item.priceChange * 100) > 0 && "+"}
                  {(item.priceChange * 100).toFixed(2)}%
                </div>
                <div className="whitespace-nowrap text-right">
                  {item.period === "DAY_1" && "New 24hr"}
                  {item.period === "WEEK_1" && "New 7day"}
                  {item.period === "MONTH_1" && "New 30day"}
                  {item.period === "MINUTE_5" && "[Small] 5min Rise"}
                  {(item.eventType).includes("DOWN") && " Low"}
                  {(item.eventType).includes("UP") && " High"}
                  {(item.eventType).includes("DROP_BACK") && "Pullback"}
                </div>
              </div>

              <div className="pl-2">
                <div className={`text-white w-10 h-4 px-1.5 ${((item.eventType).includes("DOWN") || (item.eventType).includes("DROP_BACK")) ? "bg-[--minus]" : "bg-[--plus]"} rounded-sm flex items-center justify-center`}>
                  {item.period === "DAY_1" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 16" fill="none" class="css-1s7p1e9"><path d="M19.465 6v2.5L16 11l-3.465-2.5V6L16 8.5 19.465 6zM10.02 9.636H3V7.364h7.02v2.272zm18.98 0h-7.02V7.364H29v2.272z" fill="currentColor"></path></svg>}
                  {item.period === "WEEK_1" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 16" fill="none" class="css-1s7p1e9"><path d="M19.484 3v2.676L16.02 8.353l-3.465-2.677V3l3.465 2.676L19.484 3z" fill="currentColor"></path><path d="M19.484 7.647v2.676L16.02 13l-3.465-2.676V7.648l3.465 2.676 3.464-2.676zM10.04 9.216H3.02V6.784h7.02v2.432zm18.98 0H22V6.784h7.02v2.432z" fill="currentColor"></path></svg>}
                  {item.period === "MONTH_1" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 16" fill="none" class="css-1s7p1e9"><path d="M12.535 2v2.192L16 6.385l3.465-2.192V2L16 4.193 12.535 2z" fill="currentColor"></path><path d="M12.535 5.807V8L16 10.193 19.465 8V5.807L16 8l-3.465-2.193z" fill="currentColor"></path><path d="M12.535 9.615v2.192L16 14l3.465-2.193V9.615L16 11.807l-3.465-2.192zm9.445-2.611H29v1.992h-7.02V7.004zM3 7.004h7.02v1.992H3V7.004z" fill="currentColor"></path></svg>}
                  {item.eventType === "DROP_BACK" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 16" fill="none" class="css-1s7p1e9"><path d="M19.465 6v2.5L16 11l-3.465-2.5V6L16 8.5 19.465 6zM10.02 9.636H3V7.364h7.02v2.272zm18.98 0h-7.02V7.364H29v2.272z" fill="currentColor"></path></svg>}
                  {item.eventType === "UP_1" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 16" fill="none" class="css-1s7p1e9"><path d="M15.077 4.308h4.615v4.615l-1.846-1.846-5.077 5.077-.923-.923 5.077-5.077-1.846-1.846z" fill="currentColor"></path></svg>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketActivity;
