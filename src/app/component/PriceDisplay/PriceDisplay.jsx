'use client'

import { useQuery } from "@tanstack/react-query";
import { getBinanceProductBySymbolData, getBinanceSymbolTickerPriceData } from "../../utils/fetchBinanceData";
import { AiFillStar } from "react-icons/ai";
import { useSymbolStore } from "../../hooks/stateManagement";
import React from "react";

const Tag = ({ text, className }) => (
  <span className={`text-xs ${className}`}>{text}</span>
);

const PriceDisplay = () => {
  const { defaultSymbol, base } = useSymbolStore()

  const { data: getBinanceSymbolTickerPrice } = useQuery({
    queryKey: ["getBinanceSymbolTickerPriceData", defaultSymbol],
    queryFn: async () => {
      const result = await getBinanceSymbolTickerPriceData(defaultSymbol);
      return result;
    },
  });

  const { data: binanceProductBySymbol } = useQuery({
    queryKey: ["binanceProductBySymbol", defaultSymbol],
    queryFn: async () => {
      const result = await getBinanceProductBySymbolData(defaultSymbol);
      return result?.data;
    },
  });

  return (
    <div className="bg-[--background-card] text-sm items-center flex pl-4 rounded-lg col-span-2 row-span-1 overflow-hidden">
      {getBinanceSymbolTickerPrice && (

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 h-[40px]">
            <span className="text-gray-500 border border-gray-500 rounded-md p-1">
              <AiFillStar className="w-4 h-4" />
            </span>
            <div className="flex gap-4">
              <div className="flex flex-col items-start gap-0">
                <span className="text-xl font-bold">
                  {binanceProductBySymbol?.s}
                </span>
                <span className="text-xs text-gray-400">{binanceProductBySymbol?.an} Price</span>
              </div>
              <div className="flex flex-col items-start gap-0">
                <span
                  className={`text-xl font-bold ${getBinanceSymbolTickerPrice?.priceChangePercent >= 0
                    ? "text-[--plus]"
                    : "text-[--minus]"
                    }`}
                >
                  {Number(getBinanceSymbolTickerPrice?.lastPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className={`text-xs`}>
                  $
                  {Number(getBinanceSymbolTickerPrice?.lastPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm h-[40px] w-screen">
            <div className="flex flex-col items-start gap-1">
              <div className="text-gray-400">24h Change</div>
              <div className="flex items-start gap-1">
                <span
                  className={`text-xs ${getBinanceSymbolTickerPrice?.priceChange >= 0
                    ? "text-[--plus]"
                    : "text-[--minus]"
                    }`}
                >
                  {Number(
                    getBinanceSymbolTickerPrice?.priceChange
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`text-xs ${getBinanceSymbolTickerPrice?.priceChangePercent >= 0
                    ? "text-[--plus]"
                    : "text-[--minus]"
                    }`}
                >
                  {getBinanceSymbolTickerPrice?.priceChangePercent >= 0
                    ? "+"
                    : ""}
                  {Number(
                    getBinanceSymbolTickerPrice?.priceChangePercent
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  %
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="text-gray-400">24h High</div>
              <div className="flex items-start gap-1">
                <span className={`text-xs`}>
                  {Number(getBinanceSymbolTickerPrice?.highPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="text-gray-400">24h Low</div>
              <div className="flex items-start gap-1">
                <span className={`text-xs`}>
                  {Number(getBinanceSymbolTickerPrice?.lowPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="text-gray-400">24h Volume({base})</div>
              <div className="flex items-start gap-1">
                <span className={`text-xs`}>
                  {Number(getBinanceSymbolTickerPrice?.volume).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="text-gray-400">24h Volume(USDT)</div>
              <div className="flex items-start gap-1">
                <span className={`text-xs`}>
                  {Number(
                    getBinanceSymbolTickerPrice?.quoteVolume
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-1">
              <div className="text-gray-400">Token Tags</div>
              <div className="flex items-start">
                {binanceProductBySymbol?.tags?.map((tag, index, array) => (
                  <Tag
                    key={tag}
                    text={tag}
                    className={`
                      text-yellow-500
                      hover:text-yellow-300
                      cursor-pointer
                      ${index === 0 ? 'pl-0' : 'pl-2'}
                      ${index !== array.length - 1 ? 'pr-2 border-r border-r-gray-500' : 'pr-0'}
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(PriceDisplay);
