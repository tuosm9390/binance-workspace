'use client'

import { useQuery } from "@tanstack/react-query";
import { getBinanceData } from "../../utils/fetchBinanceData";
import { useState } from "react";
import CandleChart from "../../component/CandleChart";

export default function Home() {
  const [interval, setInterval] = useState("1d")
  const [symbol, setSymbol] = useState("BTCUSDT")
  const [prices, setPrices] = useState([])

  // useQuery 호출
  const { data, isLoading, error } = useQuery({
    queryKey: ["binanceData", interval, symbol],
    queryFn: async () => {
      const result = await getBinanceData(interval, symbol)
      // api 호출 실패 시
      if (!result || result.length === 0) {
        console.warn("No data returned or data is empty")
        throw new Error('Network response was not ok')
      }

      // 데이터 형식
      // [
      //   [
      //     1499040000000,      // Kline open time
      //     "0.01634790",       // Open price
      //     "0.80000000",       // High price
      //     "0.01575800",       // Low price
      //     "0.01577100",       // Close price
      //     "148976.11427815",  // Volume
      //     1499644799999,      // Kline Close time
      //     "2434.19055334",    // Quote asset volume
      //     308,                // Number of trades
      //     "1756.87402397",    // Taker buy base asset volume
      //     "28.46694368",      // Taker buy quote asset volume
      //     "0"                 // Unused field, ignore.
      //   ]
      // ]

      // 데이터 형식 변환
      const prices = result.map(([time, open, high, low, close, volume, closeTime, quoteAssetVolume, trades, takerBuyBaseAssetVolume, takerBuyQuoteAssetVolume, unused]) => ({
        x: time,
        y: [open, high, low, close]
      }))

      setPrices(prices)

      // api 호출 성공 시
      return result
    },
  });

  return (
    <div className="p-8 pb-20 gap-16 sm:p-20">
      {isLoading && <div>Loading...</div>}
      {data && <div>
        <CandleChart prices={prices} />
      </div>}
    </div>
  );
}
