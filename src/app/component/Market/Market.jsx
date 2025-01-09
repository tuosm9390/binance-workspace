import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getBinanceHotCoinsData,
  getBinanceSymbolTickerPriceData
} from "../../utils/fetchBinanceData";
import { useMiniTickerStore, useSymbolStore } from "../../hooks/stateManagement";
import SearchBar from "./SearchBar";
import FilterTabs from "./FilterTabs";
import MarketList from "./MarketList";
import TopSearch from "./TopSearch";

const Market = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("USDT");
  const { setDefaultSymbol, setBase, setQuote } = useSymbolStore();
  const { setMiniTicker } = useMiniTickerStore();

  const { data: hotCoins } = useQuery({
    queryKey: ["hotCoins"],
    queryFn: getBinanceHotCoinsData,
  });

  const { data: allTickerPriceData } = useQuery({
    queryKey: ["allTickerPriceData"],
    queryFn: async () => {
      var result = await getBinanceSymbolTickerPriceData();
      result = result.filter((item) => item.count != 0)
      setMiniTicker(result);
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

  useWebSocketConnection();

  return (
    <div className="bg-[--background-card] text-white items-center flex flex-col rounded-lg row-start-1 row-end-3">
      <SearchBar
        onFocus={() => {
          getBinanceHotCoinsData();
          setIsFocused(true);
        }}
        onBlur={(e) => {
          e.preventDefault();
          setTimeout(() => {
            setIsFocused(false);
          }, 100);
        }}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      {!isFocused ? (
        <>
          <FilterTabs filter={filter} setFilter={setFilter} />
          <MarketList
            allTickerPriceData={allTickerPriceData}
            filter={filter}
            searchValue={searchValue}
            handlePairClick={handlePairClick}
          />
        </>
      ) : (
        <TopSearch
          hotCoins={hotCoins}
          allTickerPriceData={allTickerPriceData}
          handlePairClick={handlePairClick}
        />
      )}
    </div>
  );
};

const useWebSocketConnection = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const websocket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=!miniTicker@arr@3000ms`);

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)?.data;
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

    return () => websocket.close();
  }, [queryClient]);
};

export default Market;
