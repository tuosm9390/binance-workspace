import { useLayoutEffect, useState } from "react";
import {
  getBinanceHotCoinsData
} from "../../utils/fetchBinanceData";
import { useSymbolStore } from "../../hooks/stateManagement";
import SearchBar from "./SearchBar";
import FilterTabs from "./FilterTabs";
import MarketList from "./MarketList";
import TopSearch from "./TopSearch";

const Market = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("USDT");
  const { setDefaultSymbol, setBase, setQuote } = useSymbolStore();

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
            filter={filter}
            searchValue={searchValue}
            handlePairClick={handlePairClick}
          />
        </>
      ) : (
        <TopSearch
          allTickerPriceData={allTickerPriceData}
          handlePairClick={handlePairClick}
        />
      )}
    </div>
  );
};

export default Market;
