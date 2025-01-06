import { useQuery } from '@tanstack/react-query';
import { getBinanceSymbol24HTickerPrice } from '../../utils/fetchBinanceData';
import { AiFillStar } from 'react-icons/ai';

const Tag = ({ text, className }) => (
  <span className={`text-xs ${className}`}>
    {text}
  </span>
);

const PriceDisplay = ({ symbol }) => {
  const { data: binanceSymbol24HTickerPrice, isLoading } = useQuery({
    queryKey: ["binanceSymbol24HTickerPrice", symbol],
    queryFn: async () => {
      const result = await getBinanceSymbol24HTickerPrice(symbol)
      return result
    }
  })

  return (
    <div className="bg-[--background-card] text-white items-center flex pl-4 rounded-lg col-span-2 row-span-1">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 h-[40px]">
          <span className="text-gray-500 border border-gray-500 rounded-md p-1">
            <AiFillStar className="w-4 h-4" />
          </span>
          <div className="flex gap-4">
            <div className="flex flex-col items-start gap-0">
              <span className="text-xl font-bold">{binanceSymbol24HTickerPrice?.symbol}</span>
              <span className="text-xs text-gray-400">Bitcoin Price</span>
            </div>
            <div className="flex flex-col items-start gap-0">
              <span className={`text-xl font-bold ${binanceSymbol24HTickerPrice?.priceChangePercent >= 0 ? 'text-[--plus]' : 'text-[--minus]'}`}>
                {Number(binanceSymbol24HTickerPrice?.lastPrice).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
              <span className={`text-xs`}>
                ${Number(binanceSymbol24HTickerPrice?.lastPrice).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm h-[40px]">
          <div className="flex flex-col items-start gap-1">
            <div className="text-gray-400">24h Change</div>
            <div className="flex items-start gap-1">
              <span className={`text-xs ${binanceSymbol24HTickerPrice?.priceChange >= 0 ? 'text-[--plus]' : 'text-[--minus]'}`}>
                {Number(binanceSymbol24HTickerPrice?.priceChange).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
              <span className={`text-xs ${binanceSymbol24HTickerPrice?.priceChangePercent >= 0 ? 'text-[--plus]' : 'text-[--minus]'}`}>
                {binanceSymbol24HTickerPrice?.priceChangePercent >= 0 ? '+' : '-'}
                {Number(binanceSymbol24HTickerPrice?.priceChangePercent).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}%
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <div className="text-gray-400">24h High</div>
            <div className="flex items-start gap-1">
              <span className={`text-xs`}>
                {Number(binanceSymbol24HTickerPrice?.highPrice).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <div className="text-gray-400">24h Low</div>
            <div className="flex items-start gap-1">
              <span className={`text-xs`}>
                {Number(binanceSymbol24HTickerPrice?.lowPrice).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <div className="text-gray-400">24h Volume(BTC)</div>
            <div className="flex items-start gap-1">
              <span className={`text-xs`}>
                {Number(binanceSymbol24HTickerPrice?.volume).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <div className="text-gray-400">24h Volume(USDT)</div>
            <div className="flex items-start gap-1">
              <span className={`text-xs`}>
                {Number(binanceSymbol24HTickerPrice?.quoteVolume).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1">
            <div className="text-gray-400">Token Tags</div>
            <div className="flex items-start">
              <Tag text="POW" className="text-yellow-500 pr-2 border-r border-r-gray-500 hover:text-yellow-300 cursor-pointer" />
              <Tag text="Payments" className="text-yellow-500 px-2 border-r border-r-gray-500 hover:text-yellow-300 cursor-pointer" />
              <Tag text="Vol" className="text-yellow-500 border-r px-2 border-r-gray-500 hover:text-yellow-300 cursor-pointer" />
              <Tag text="Hot" className="text-yellow-500 border-r px-2 border-r-gray-500 hover:text-yellow-300 cursor-pointer" />
              <Tag text="Price Protection" className="text-yellow-500 pl-2 hover:text-yellow-300 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceDisplay;