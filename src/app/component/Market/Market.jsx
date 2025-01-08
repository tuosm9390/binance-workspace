import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getBinanceHotCoinsData, getBinanceSymbolTickerPriceData
} from "../../utils/fetchBinanceData";
import { FiSearch } from "react-icons/fi";
import { useSymbolStore } from "../../hooks/stateManagement";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const FILTER_ITEMS = ["USDT", "FDUSDT", "USDC", "TUSD", "BNB", "BTC", "ALTS", "FIAT"];

const getFilterItemStyles = (isActive) => `
  text-gray-400 
  font-semibold 
  whitespace-nowrap 
  cursor-pointer
  hover:text-gray-300
  transition-colors
  ${isActive ? "border-b-2 border-yellow-400 text-white" : ""}
`.trim();

const Market = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { defaultSymbol, setDefaultSymbol, base, setBase, quote, setQuote } = useSymbolStore();
  const [filter, setFilter] = useState("USDT");

  const { data: hotCoins } = useQuery({
    queryKey: ["hotCoins"],
    queryFn: getBinanceHotCoinsData,
  });

  const { data: allTickerPriceData } = useQuery({
    queryKey: ["allTickerPriceData"],
    queryFn: async () => {
      var result = await getBinanceSymbolTickerPriceData();
      result = result.filter((item) => item.count != 0)
      return result;
    },
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

  // 웹소켓 연결
  const queryClient = useQueryClient();
  useEffect(() => {
    const websocket = new WebSocket(`wss://stream.binance.com:9443/ws/!miniTicker@arr@3000ms`);
    websocket.onopen = () => {
      return
    };
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // 데이터가 배열 형태로 오므로 각 항목을 순회하며 업데이트
      data.forEach(item => {
        const transformedData = {
          "symbol": item.s,
          "openPrice": parseFloat(item.o),
          "lastPrice": parseFloat(item.c),
          "count": item.n
        };

        queryClient.setQueryData(
          ["allTickerPriceData"],
          (oldData) => {
            if (!oldData) return oldData;

            return oldData.map(coin => {
              if (coin.symbol === transformedData.symbol) {
                return {
                  ...coin,
                  lastPrice: transformedData.lastPrice,
                  priceChangePercent: ((transformedData.lastPrice - transformedData.openPrice) / transformedData.openPrice) * 100,
                };
              }
              return coin;
            });
          }
        );
      });
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);

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
              getBinanceHotCoinsData();
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
            <div className="relative flex items-center px-6">
              <div className="absolute left-0 flex items-center h-full z-10">
                <div className="absolute w-8 h-full bg-gradient-to-r from-[--background-card] to-[--background-card]/100"></div>
                <button
                  className="p-1 text-gray-400 hover:text-white z-20 ml-2"
                  onClick={() => {
                    const container = document.getElementById('filter-container');
                    container.scrollLeft -= 100;
                  }}
                >
                  <MdKeyboardArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <div
                id="filter-container"
                className="flex gap-4 mt-2 text-sm overflow-x-auto scrollbar-hide px-4"
                style={{ scrollBehavior: 'smooth' }}
              >
                {FILTER_ITEMS.map((item) => (
                  <span
                    key={item}
                    className={getFilterItemStyles(filter === item)}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="absolute right-0 flex items-center h-full z-10">
                <div className="absolute w-8 h-full bg-gradient-to-l from-[--background-card] to-[--background-card]/100"></div>
                <button
                  className="p-1 text-gray-400 hover:text-white z-20 mr-2"
                  onClick={() => {
                    const container = document.getElementById('filter-container');
                    container.scrollLeft += 100;
                  }}
                >
                  <MdKeyboardArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col mt-2 text-sm h-[320px] overflow-y-auto overflow-x-hidden">
              <div className="grid grid-cols-[3fr_2fr_2fr] pl-4 pr-0 py-1">
                <div className="text-gray-400 font-semibold text-xs">Pair</div>
                <div className="text-gray-400 font-semibold text-xs">Last Price</div>
                <div className="text-gray-400 font-semibold text-xs">24h Change</div>
              </div>
              {allTickerPriceData &&
                allTickerPriceData?.filter((coin) => {
                  const symbol = coin.symbol;
                  const lastFourChars = symbol.slice(-4);  // 뒤에서 4글자 추출
                  const hasFilter = lastFourChars.includes(filter);  // 필터값이 포함되어 있는지 확인

                  if (hasFilter) {
                    // filter가 포함된 경우, 해당 부분을 제외한 문자열을 base로 저장
                    coin.base = symbol.replace(filter, '');
                    coin.quote = filter;
                  }

                  return hasFilter;
                }).map((coin, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[4fr_3fr_2fr] hover:bg-gray-800 py-1 px-4 rounded cursor-pointer"
                    onClick={() => handlePairClick(coin)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs">
                        {coin.base + "/" + coin.quote}
                      </span>
                      <span className="text-xs bg-gray-800 px-1 rounded-sm">
                        {/* {Number(coin.marginRatio) + "x"} */}
                        5x
                      </span>
                    </div>

                    <div className="text-right text-xs">
                      {parseFloat(coin.lastPrice) < 1
                        ? parseFloat(coin.lastPrice).toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 10 })
                        : parseFloat(coin.lastPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })
                      }
                    </div>

                    <div className={`text-right text-xs ${parseFloat(coin.priceChangePercent) > 0 ? "text-[--plus]" : "text-[--minus]"}`}>
                      {parseFloat(coin.priceChangePercent).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      {isFocused && (
        <>
          <div className="w-full pl-4">
            <div className="flex flex-col mt-2 text-sm h-[350px] overflow-y-auto">
              <span className="text-white font-semibold pb-3">Top Search</span>
              <div className="flex flex-col">
                {hotCoins.data.map((coin, index) => {
                  // allTickerPriceData에서 일치하는 가격 정보 찾기
                  const priceData = allTickerPriceData?.find(
                    (price) => price.symbol === (coin.symbol)
                  );

                  return (
                    <div
                      key={index}
                      className="grid grid-cols-[3fr_2fr_2fr] hover:bg-gray-800 py-1 rounded cursor-pointer pr-4"
                      onClick={() => handlePairClick(coin)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-white text-xs">
                          {coin.assetCode + "/USDT"}
                        </span>
                      </div>
                      {priceData && (
                        <>
                          <div className="text-right text-xs">
                            {parseFloat(priceData.lastPrice) < 1
                              ? parseFloat(priceData.lastPrice).toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 10 })
                              : parseFloat(priceData.lastPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })
                            }
                          </div>
                          <div className={`text-right text-xs ${parseFloat(priceData.priceChangePercent) > 0 ? "text-[--plus]" : "text-[--minus]"}`}>
                            {parseFloat(priceData.priceChangePercent).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Market;
