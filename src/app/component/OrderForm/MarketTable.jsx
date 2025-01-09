import { useState, useRef, useEffect } from "react";
import { useSymbolStore } from "../../hooks/stateManagement";
import { getBinanceExchangeInfoData } from "../../utils/fetchBinanceData";
import { useQuery } from "@tanstack/react-query";
import PriceInput from "./components/PriceInput";
import AmountInput from "./components/AmountInput";
import AvailableBalance from "./components/AvailableBalance";
import ActionButton from "./components/ActionButton";
import Slider from "./components/Slider";

const MarketTable = ({
  buyPrice,
  setBuyPrice,
  sellPrice,
  setSellPrice,
  buyAmount,
  setBuyAmount,
  sellAmount,
  setSellAmount,
}) => {
  const { defaultSymbol, base, quote } = useSymbolStore();
  const [showBuyDropdown, setShowBuyDropdown] = useState(false);
  const [showSellDropdown, setShowSellDropdown] = useState(false);
  const [selectedBuyCurrency, setSelectedBuyCurrency] = useState("");
  const [selectedSellCurrency, setSelectedSellCurrency] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (quote) {
      setSelectedBuyCurrency(quote);
      setSelectedSellCurrency(base);
    }
  }, [quote]);

  const handleBuyMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowBuyDropdown(false);
    }, 100);
  };

  const handleSellMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowSellDropdown(false);
    }, 100);
  };

  const handleBuyMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowBuyDropdown(true);
  };

  const handleSellMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowSellDropdown(true);
  };

  const { data: exchangeInfoData } = useQuery({
    queryKey: ["exchangeInfoData", defaultSymbol],
    queryFn: () => getBinanceExchangeInfoData(defaultSymbol),
    enabled: !!defaultSymbol,
  });

  const handleNumberInput = (value) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value) || value === "") {
      return value;
    }
    return false;
  };

  const handleBuyPriceChange = (e) => {
    const newValue = handleNumberInput(e.target.value);
    if (newValue !== false) {
      setBuyPrice(newValue);
    }
  };

  const handleSellPriceChange = (e) => {
    const newValue = handleNumberInput(e.target.value);
    if (newValue !== false) {
      setSellPrice(newValue);
    }
  };

  const handleBuyAmountChange = (e) => {
    const newValue = handleNumberInput(e.target.value);
    if (newValue !== false) {
      setBuyAmount(newValue);
    }
  };

  const handleSellAmountChange = (e) => {
    const newValue = handleNumberInput(e.target.value);
    if (newValue !== false) {
      setSellAmount(newValue);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        {/* Buy Form */}
        <div className="flex-1">
          <PriceInput
            label="Price"
            quoteLabel="Market Price"
            onChange={handleBuyPriceChange}
            isMarket={true}
          />

          <AmountInput
            label={selectedBuyCurrency === quote ? "Amount" : "Total"}
            amount={buyAmount}
            placeholder={
              selectedBuyCurrency === quote &&
              exchangeInfoData?.symbols?.[0]?.filters?.[6]?.minNotional
                ? `Minimun ${parseFloat(
                    exchangeInfoData.symbols[0].filters[6].minNotional
                  )}`
                : ""
            }
            onChange={handleBuyAmountChange}
            selectedCurrency={selectedBuyCurrency}
            showDropdown={showBuyDropdown}
            onMouseEnter={handleBuyMouseEnter}
            onMouseLeave={handleBuyMouseLeave}
            onCurrencySelect={(currency) => {
              setSelectedBuyCurrency(currency);
              setShowBuyDropdown(false);
            }}
            options={[base, quote]}
          />

          <Slider />

          <AvailableBalance
            availableCurrency={quote}
            maxLabel="Max Buy"
            maxCurrency={base}
          />

          <ActionButton type="buy">Log In</ActionButton>
        </div>

        {/* Sell Form */}
        <div className="flex-1">
          <PriceInput
            label="Price"
            quoteLabel="Market Price"
            onChange={handleSellPriceChange}
            isMarket={true}
          />

          <AmountInput
            label={selectedSellCurrency === quote ? "Amount" : "Total"}
            amount={sellAmount}
            placeholder={
              selectedSellCurrency === quote &&
              exchangeInfoData?.symbols?.[0]?.filters?.[6]?.minNotional
                ? `Minimun ${parseFloat(
                    exchangeInfoData.symbols[0].filters[6].minNotional
                  )}`
                : ""
            }
            onChange={handleSellAmountChange}
            selectedCurrency={selectedSellCurrency}
            showDropdown={showSellDropdown}
            onMouseEnter={handleSellMouseEnter}
            onMouseLeave={handleSellMouseLeave}
            onCurrencySelect={(currency) => {
              setSelectedSellCurrency(currency);
              setShowSellDropdown(false);
            }}
            options={[base, quote]}
          />

          <Slider />

          <AvailableBalance
            availableCurrency={base}
            maxLabel="Max Sell"
            maxCurrency={quote}
          />

          <ActionButton type="sell">Log In</ActionButton>
        </div>
      </div>
    </>
  );
};

export default MarketTable;
