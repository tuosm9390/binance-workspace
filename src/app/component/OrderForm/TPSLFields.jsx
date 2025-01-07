import React, { useState } from 'react'

const TPSLFields = ({ side }) => {
  const [isMarket, setIsMarket] = useState(false);

  return (
    <div className="mt-2 space-y-3">
      {/* Take Profit */}
      <div>
        <div className="text-xs text-gray-400 mb-1">Take Profit</div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full bg-transparent border border-gray-700 rounded-lg p-2 text-sm font-semibold outline-none hover:border-yellow-400 transition-all duration-500"
              placeholder="TP Limit"
            />
          </div>
          <div className="relative w-24">
            <input
              type="text"
              className="w-full bg-transparent border border-gray-700 rounded-lg p-2 text-sm font-semibold pr-8 outline-none hover:border-yellow-400 transition-all duration-500"
              placeholder="Offset"
            />
            <span className="absolute right-2 top-2 text-gray-400 text-sm">%</span>
          </div>
        </div>
      </div>

      {/* Stop Loss */}
      <div>
        <div className="text-xs text-gray-400 mb-1">Stop Loss</div>
        <div className="flex gap-2 mb-2">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full bg-transparent border border-gray-700 rounded-lg p-2 text-sm font-semibold outline-none hover:border-yellow-400 transition-all duration-500"
              placeholder={"SL Trigger"}
            />
          </div>
          <div className="relative w-24">
            <input
              type="text"
              className="w-full bg-transparent border border-gray-700 rounded-lg p-2 text-sm font-semibold pr-8 outline-none hover:border-yellow-400 transition-all duration-500"
              placeholder="Offset"
            />
            <span className="absolute right-2 top-2 text-gray-400 text-sm">%</span>
          </div>
        </div>

        {/* Market or Limit */}
        <div className="flex gap-2 mb-2">
          <div className="relative flex-1">
            <input
              type="text"
              className={`w-full bg-transparent border border-gray-700 rounded-lg p-2 text-sm font-semibold  outline-none ${isMarket ? "bg-gray-600" : "hover:border-yellow-400 transition-all duration-500"}`}
              placeholder={isMarket ? "SL Market" : "SL Limit"}
              disabled={isMarket}
            />
          </div>
          <div className="relative w-24">
            <button
              className={`w-full rounded-lg p-2 text-sm font-semibold transition-colors border border-gray-700
            ${isMarket && 'border border-white'}`}
              onClick={() => setIsMarket(!isMarket)}
            >
              Market
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TPSLFields