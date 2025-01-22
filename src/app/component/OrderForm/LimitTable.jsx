'use client'

import { useOrderFormStore, useSymbolStore } from '../../hooks/stateManagement';
import ActionButton from './components/ActionButton';
import AvailableBalance from './components/AvailableBalance';
import PriceInput from './components/PriceInput';
import Slider from './components/Slider';
import TPSLFields from './TPSLFields';

const LimitTable = ({ fixedLastPrice, buyPrice, setBuyPrice, sellPrice, setSellPrice, buyAmount, setBuyAmount, sellAmount, setSellAmount }) => {
  const { orderForm, setOrderForm } = useOrderFormStore();
  const { base, quote } = useSymbolStore();

  // 문자열에서 콤마를 제거하고 숫자로 변환하는 함수
  const parseNumberValue = (value) => {
    if (typeof value === 'string') {
      return value.replace(/,/g, '');
    }
    return value;
  };

  // 숫자와 소수점만 허용하는 함수
  const handleNumberInput = (value) => {
    // 숫자와 소수점만 허용하는 정규식
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value) || value === '') {
      return value;
    }
    return false;
  };

  // 구매 가격 변경 함수
  const handleBuyPriceChange = (e) => {
    const newValue = handleNumberInput(e.target.value);
    if (newValue !== false) {
      setBuyPrice(newValue);
    }
  };

  // 판매 가격 변경 함수
  const handleSellPriceChange = (e) => {
    const newValue = handleNumberInput(e.target.value);
    if (newValue !== false) {
      setSellPrice(newValue);
    }
  };

  // 구매 수량 변경 함수
  const handleBuyAmountChange = (e) => {
    const newValue = handleNumberInput(e.target.value);
    if (newValue !== false) {
      setBuyAmount(newValue);
    }
  };

  // 판매 수량 변경 함수
  const handleSellAmountChange = (e) => {
    const newValue = handleNumberInput(e.target.value);
    if (newValue !== false) {
      setSellAmount(newValue);
    }
  };

  return (
    <>
      {/* Buy Form */}
      <div className="flex gap-4">
        <div className="flex-1">
          {/* Price Input */}
          <PriceInput
            label="Limit"
            quoteLabel={quote}
            onChange={handleBuyPriceChange}
            isMarket={false}
            value={parseNumberValue(buyPrice) || fixedLastPrice || ""}
          />

          {/* Amount Input */}
          <div className="mb-3">
            <div className="relative flex border border-gray-700 rounded-lg p-2 text-sm font-semibold hover:border-yellow-400 transition-all duration-500">
              <span className="text-gray-400">Amount</span>
              <input
                type="text"
                className="w-full bg-transparent pr-2 text-right outline-none"
                value={buyAmount}
                onChange={handleBuyAmountChange}
              />
              <span className="text-white">{base}</span>
            </div>
          </div>

          <Slider />

          {/* TP/SL Checkbox */}
          <div className="mb-3">
            <label className="flex items-center text-sm text-gray-400">
              <input
                type="checkbox"
                className="mr-2"
                checked={orderForm}
                onChange={(e) => setOrderForm(e.target.checked)}
              />
              TP/SL
            </label>
            {orderForm && <TPSLFields side="buy" />}
          </div>

          <AvailableBalance
            availableCurrency={quote}
            maxLabel="Max Buy"
            maxCurrency={base}
          />

          <ActionButton type="buy">
            Log In
          </ActionButton>
        </div>

        {/* Sell Form */}
        <div className="flex-1">
          {/* Price Input */}
          <div className="mb-3">
            <div className="relative flex border border-gray-700 rounded-lg p-2 text-sm font-semibold hover:border-yellow-400 transition-all duration-500">
              <span className="text-gray-400 text-sm">Price</span>
              <input
                type="text"
                className="w-full bg-transparent pr-2 text-right outline-none"
                value={parseNumberValue(sellPrice) || fixedLastPrice || ""}
                onChange={handleSellPriceChange}
              />
              <span className="text-white0 text-sm">{quote}</span>
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-3">
            <div className="relative flex border border-gray-700 rounded-lg p-2 text-sm font-semibold hover:border-yellow-400 transition-all duration-500">
              <span className="text-gray-400 text-sm">Amount</span>
              <input
                type="text"
                className="w-full bg-transparent pr-2 text-right outline-none"
                value={sellAmount}
                onChange={handleSellAmountChange}
              />
              <span className="text-white text-sm">{base}</span>
            </div>
          </div>

          <Slider />

          {/* TP/SL Checkbox */}
          <div className="mb-3">
            <label className="flex items-center text-sm text-gray-400">
              <input
                type="checkbox"
                className="mr-2"
                checked={orderForm}
                onChange={(e) => setOrderForm(e.target.checked)}
              />
              TP/SL
            </label>
            {orderForm && <TPSLFields side="sell" />}
          </div>

          <AvailableBalance
            availableCurrency={base}
            maxLabel="Max Sell"
            maxCurrency={quote}
          />

          <ActionButton type="sell">
            Log In
          </ActionButton>
        </div>
      </div>
    </>
  )
}

export default LimitTable