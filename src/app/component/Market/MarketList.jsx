import { useQuery } from "@tanstack/react-query";
import { getBinanceSymbolTickerPriceData } from "../../utils/fetchBinanceData";
import { useMiniTickerStore, useSymbolStore } from "../../hooks/stateManagement";

const MarketList = ({ filter, searchValue, handlePairClick }) => {
  const { setMiniTicker } = useMiniTickerStore();
  const { defaultSymbol } = useSymbolStore()

  const { data: allTickerPriceData } = useQuery({
    queryKey: ["allTickerPriceData"],
    queryFn: async () => {
      var result = await getBinanceSymbolTickerPriceData();
      result = result.filter((item) => item.count != 0)
      setMiniTicker(result);
      return result;
    },
    enabled: !!defaultSymbol
  });

  return (
    <div className="w-full">
      <div className="flex flex-col mt-2 text-sm h-[320px] overflow-y-auto overflow-x-hidden">
        <MarketListHeader />
        {allTickerPriceData &&
          allTickerPriceData
            ?.filter((coin) => {
              const symbol = coin.symbol;
              const lastFourChars = symbol.slice(-4);
              const hasFilter = lastFourChars.includes(filter);

              if (hasFilter) {
                coin.base = symbol.replace(filter, '');
                coin.quote = filter;
              }

              const searchLower = searchValue.toLowerCase();
              const baseQuoteMatch = hasFilter &&
                (coin.base.toLowerCase().includes(searchLower) ||
                  coin.quote.toLowerCase().includes(searchLower));

              return hasFilter && (searchValue === '' || baseQuoteMatch);
            })
            .map((coin, index) => (
              <MarketListItem key={index} coin={coin} handlePairClick={handlePairClick} />
            ))}
      </div>
    </div>
  );
};

const MarketListHeader = () => (
  <div className="grid grid-cols-[3fr_2fr_2fr] pl-4 pr-0 py-1">
    <div className="text-gray-400 font-semibold text-xs">Pair</div>
    <div className="text-gray-400 font-semibold text-xs">Last Price</div>
    <div className="text-gray-400 font-semibold text-xs">24h Change</div>
  </div>
);

const MarketListItem = ({ coin, handlePairClick }) => (
  <div
    className="grid grid-cols-[4fr_3fr_2fr] hover:bg-gray-800 py-1 px-4 rounded cursor-pointer"
    onClick={() => handlePairClick(coin)}
  >
    <div className="flex items-center gap-2">
      <span className="text-white text-xs">
        {coin.base + "/" + coin.quote}
      </span>
      <span className="text-xs bg-gray-800 px-1 rounded-sm">
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
);

export default MarketList; 