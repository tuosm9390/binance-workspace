import { useMiniTickerStore } from "../../hooks/stateManagement"

const Footer = () => {
  const { miniTicker } = useMiniTickerStore()

  // 데이터를 두 번 반복하여 연속적인 스크롤 효과 생성
  const duplicatedTicker = [...miniTicker, ...miniTicker]

  return (
    <footer className="fixed bottom-0 w-full flex h-6 bg-[--background] font-semibold text-sm z-50 pt-1 overflow-hidden">
      <div className="inline-flex items-center bg-[--background-card] p-1 whitespace-nowrap">
        {duplicatedTicker.map((item, index) => (
          <div className="flex items-center gap-2 ml-4 animate-[ticker_20s_linear_infinite]" key={index}>
            <div className="text-xs">{item.symbol}</div>
            <div className={`text-right text-xs ${parseFloat(item.priceChangePercent) > 0 ? "text-[--plus]" : "text-[--minus]"}`}>
              {parseFloat(item.priceChangePercent).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
            </div>
            <div className="text-right text-xs">
              {parseFloat(item.lastPrice) < 1
                ? parseFloat(item.lastPrice).toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 10 })
                : parseFloat(item.lastPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })
              }
            </div>
          </div>
        ))}
      </div>
    </footer>
  )
}

export default Footer