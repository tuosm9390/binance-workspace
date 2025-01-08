import React from 'react';
import CurrencyDropdown from './CurrencyDropdown';

const AmountInput = ({
  label,
  amount,
  placeholder,
  onChange,
  selectedCurrency,
  showDropdown,
  onMouseEnter,
  onMouseLeave,
  onCurrencySelect,
  options
}) => {
  return (
    <div className="mb-3">
      <div className="relative flex border border-gray-700 rounded-lg p-2 text-sm font-semibold hover:border-yellow-400 transition-all duration-500">
        <span className="text-gray-400">{label}</span>
        <input
          type="text"
          className="w-full bg-transparent pr-2 text-right outline-none"
          value={amount}
          placeholder={placeholder}
          onChange={onChange}
        />
        <CurrencyDropdown
          selectedCurrency={selectedCurrency}
          showDropdown={showDropdown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onCurrencySelect={onCurrencySelect}
          options={options}
        />
      </div>
    </div>
  );
};

export default AmountInput; 