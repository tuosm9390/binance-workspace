const TopSearch = ({ hotCoins, allTickerPriceData, handlePairClick }) => {
  return (
    <div className="w-full pl-4">
      <div className="flex flex-col mt-2 text-sm h-[350px] overflow-y-auto">
        <span className="text-white font-semibold pb-3">Top Search</span>
        <div className="flex flex-col">
          {hotCoins.data.map((coin, index) => {
            const priceData = allTickerPriceData?.find(
              (price) => price.symbol === (coin.symbol)
            );

            return (
              <div
                key={index}
                className="grid grid-cols-[3fr_2fr_2fr] hover:bg-gray-800 py-1 rounded cursor-pointer pr-4"
                onClick={() => handlePairClick(coin)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs">
                    {coin.assetCode + "/USDT"}
                  </span>
                </div>
                {priceData && (
                  <>
                    <div className="text-right text-xs">
                      {parseFloat(priceData.lastPrice) < 1
                        ? parseFloat(priceData.lastPrice).toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 10 })
                        : parseFloat(priceData.lastPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })
                      }
                    </div>
                    <div className={`text-right text-xs ${parseFloat(priceData.priceChangePercent) > 0 ? "text-[--plus]" : "text-[--minus]"}`}>
                      {parseFloat(priceData.priceChangePercent).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopSearch; 