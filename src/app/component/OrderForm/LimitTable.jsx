import React from 'react'
import { useOrderFormStore, useSymbolStore } from '../../hooks/stateManagement';
import TPSLFields from './TPSLFields';

const LimitTable = ({ buyPrice, setBuyPrice, sellPrice, setSellPrice, buyAmount, setBuyAmount, sellAmount, setSellAmount }) => {
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
          <div className="mb-3">
            <div className="relative flex border border-gray-700 rounded-lg p-2 text-sm font-semibold hover:border-yellow-400 transition-all duration-500">
              <span className="text-gray-400">Price</span>
              <input
                type="text"
                className="w-full bg-transparent pr-2 text-right outline-none"
                value={parseNumberValue(buyPrice) || ""}
                onChange={handleBuyPriceChange}
              />
              <span className="text-gray-400">{quote}</span>
            </div>
          </div>

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
              <span className="text-gray-400">{base}</span>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-3">
            <input
              type="range"
              className="w-full"
              min="0"
              max="100"
            />
          </div>

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

          {/* Available Balance */}
          <div className="flex flex-col text-xs text-gray-400 mb-3">
            <div className="flex justify-between">
              <span>Avbl</span>
              <span className='text-white'>- {quote}</span>
            </div>
            <div className="flex justify-between">
              <span>Max Buy</span>
              <span className='text-white'>-- {base}</span>
            </div>
          </div>

          {/* Buy Button */}
          <button className="w-full bg-[--plus] hover:bg-[--plus-hover] text-white rounded-lg p-2">
            Log In
          </button>
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
                value={parseNumberValue(sellPrice) || ""}
                onChange={handleSellPriceChange}
              />
              <span className="text-gray-400 text-sm">{quote}</span>
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
              <span className="text-gray-400 text-sm">{base}</span>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-3">
            <input
              type="range"
              className="w-full"
              min="0"
              max="100"
            />
          </div>

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

          {/* Available Balance */}
          <div className="flex flex-col text-xs text-gray-400 mb-3">
            <div className="flex justify-between">
              <span>Avbl</span>
              <span className='text-white'>- {base}</span>
            </div>
            <div className="flex justify-between">
              <span>Max Buy</span>
              <span className='text-white'>-- {quote}</span>
            </div>
          </div>

          {/* Sell Button */}
          <button className="w-full bg-[--minus] hover:bg-[--minus-hover] text-white rounded-lg p-2">
            Log In
          </button>
        </div>
      </div>
    </>
  )
}

export default LimitTable