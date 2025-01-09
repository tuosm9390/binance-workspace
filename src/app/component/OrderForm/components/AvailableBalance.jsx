import React from 'react';

const AvailableBalance = ({ availableCurrency, maxLabel, maxCurrency }) => {
  return (
    <div className="flex flex-col text-xs text-gray-400 mb-3">
      <div className="flex justify-between">
        <span>Avbl</span>
        <span className='text-white'>- {availableCurrency}</span>
      </div>
      <div className="flex justify-between">
        <span className='underline decoration-dotted'>{maxLabel}</span>
        <span className='text-white'>-- {maxCurrency}</span>
      </div>
    </div>
  );
};

export default AvailableBalance; 