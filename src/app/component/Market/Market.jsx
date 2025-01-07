import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  getBinanceHotCoins,
  getBinanceListedCoins,
} from "../../utils/fetchBinanceData";
import { FiSearch } from "react-icons/fi";
import { useSymbolStore } from "../../hooks/stateManagement";

const Market = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { defaultSymbol, setDefaultSymbol, base, setBase, quote, setQuote } =
    useSymbolStore();

  const { data: hotCoins } = useQuery({
    queryKey: ["hotCoins"],
    queryFn: getBinanceHotCoins,
  });

  const { data: listedCoins } = useQuery({
    queryKey: ["listedCoins"],
    queryFn: getBinanceListedCoins,
  });

  const handlePairClick = (pair) => {
    setIsFocused(false);
    setDefaultSymbol(pair.symbol);
    setBase(pair.base || pair.assetCode);
    setQuote(pair.quote || removeQuoteCurrency(pair.symbol, pair.assetCode));
  };

  const removeQuoteCurrency = (symbol, quote) => {
    return symbol.replace(quote, "");
  };

  return (
    <div className="bg-[--background-card] text-white items-center flex flex-col rounded-lg row-start-1 row-end-3">
      {/* 검색 입력창 */}
      <div className="w-full p-4 pb-2">
        <div className="=rounded-lg flex border border-gray-700 rounded-lg items-center w-full">
          <FiSearch className="w-5 h-5 mx-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent py-1 text-white outline-none"
            onFocus={() => {
              getBinanceHotCoins();
              setIsFocused(true);
            }}
            // 검색창 벗어나면 검색 결과 사라지도록
            // 검색목록 onclick 이벤트와 충돌 방지
            onBlur={(e) => {
              e.preventDefault();
              setTimeout(() => {
                setIsFocused(false);
              }, 100);
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* 필터 탭 */}
      {!isFocused && (
        <>
          <div className="w-full border-b border-gray-700">
            <div className="flex gap-4 mt-2 text-sm px-4">
              <span className="text-white border-b-2 border-yellow-400 font-semibold">
                USDT
              </span>
              <span className="text-gray-400 font-semibold">FDUSDT</span>
              <span className="text-gray-400 font-semibold">USDC</span>
              <span className="text-gray-400 font-semibold">TUSD</span>
              <span className="text-gray-400 font-semibold">BNB</span>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col mt-2 text-sm h-[320px] overflow-y-auto">
              {listedCoins?.data &&
                listedCoins.data.map((coin, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center hover:bg-gray-800 p-2 rounded cursor-pointer"
                    onClick={() => handlePairClick(coin)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs">
                        {coin.base + "/" + coin.quote}
                      </span>
                      <span className="text-xs bg-gray-800 px-1 rounded-sm">
                        {Number(coin.marginRatio) + "x"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      {isFocused && (
        <>
          <div className="w-full">
            <div className="flex flex-col mt-2 text-sm h-[350px] overflow-y-auto">
              <span className="text-white font-semibold">Top Search</span>
              <div className="flex flex-col">
                {hotCoins.data.map((coin, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center hover:bg-gray-800 p-2 rounded cursor-pointer"
                    onClick={() => handlePairClick(coin)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs">
                        {coin.assetCode + "/USDT"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Market;
