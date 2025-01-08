import React from 'react';

const PriceInput = ({ label, onChange }) => {
  return (
    <div className="mb-3">
      <div className="relative flex rounded-lg p-2 text-sm font-semibold transition-all bg-gray-700 bg-opacity-50" aria-readonly>
        <span className="text-gray-400">{label}</span>
        <input
          type="text"
          className="w-full bg-transparent pr-2 text-right outline-none"
          onChange={onChange}
          disabled
        />
        <span className="text-gray-500 whitespace-nowrap">Market Price</span>
      </div>
    </div>
  );
};

export default PriceInput; 