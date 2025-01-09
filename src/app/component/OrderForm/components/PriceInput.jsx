import React from 'react';

const PriceInput = ({ label, onChange, isMarket = true, quoteLabel, value }) => {
  return (
    <div className="mb-3">
      <div className={`relative flex rounded-lg p-2 text-sm font-semibold transition-all border border-gray-700 ${isMarket ? "cursor-not-allowed bg-gray-700 bg-opacity-50 border-opacity-0" : ""}`}>
        <span className="text-gray-400">{label}</span>
        <input
          type="text"
          className={`w-full bg-transparent pr-2 text-right outline-none ${isMarket ? "cursor-not-allowed" : ""}`}
          onChange={onChange}
          disabled={isMarket}
          value={value}
        />
        <span className={`whitespace-nowrap ${isMarket ? "text-gray-400" : "text-white"}`}>{quoteLabel}</span>
      </div>
    </div>
  );
};

export default PriceInput; 