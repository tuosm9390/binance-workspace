import React from 'react';
import { MdCheck, MdArrowDropDown } from "react-icons/md";

const CurrencyDropdown = ({
  selectedCurrency,
  showDropdown,
  onMouseEnter,
  onMouseLeave,
  onCurrencySelect,
  options
}) => {
  return (
    <div className="relative">
      <span
        className="text-white cursor-pointer flex items-center"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {selectedCurrency}
        <MdArrowDropDown size={20} className='text-gray-400' />
      </span>
      {showDropdown && (
        <div
          className="absolute right-0 mt-1 min-w-28 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {options.map((item, index) => (
            <div
              key={index}
              className={`px-2 py-2 cursor-pointer flex items-center justify-between ${
                selectedCurrency === item ? 'bg-gray-700 text-white' : 'text-gray-400'
              }`}
              onClick={() => onCurrencySelect(item)}
            >
              {item}
              {selectedCurrency === item && (
                <span>
                  <MdCheck />
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown; 