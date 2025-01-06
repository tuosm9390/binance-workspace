'use client'

import CandleChart from '../../../component/Chart/CandleChart'
import PriceDisplay from '../../../component/PriceDisplay/PriceDisplay'
import OrderBook from '../../../component/OrderBook/OrderBook'
import Market from '../../../component/Market/Market'
import Trades from '../../../component/Trades/Trades'
import OrderForm from '../../../component/OrderForm/OrderForm'
import MarketActivity from '../../../component/MarketActivity/MarketActivity'
import { useSymbolStore } from '../../../hooks/stateManagement'

function page() {
  const { defaultSymbol } = useSymbolStore();

  return (
    <div className="p-8 grid grid-cols-[minmax(253px,320px)_minmax(510px,880px)_minmax(253px,320px)] grid-rows-[56px_360px_160px_minmax(169px,1fr)_minmax(146px,auto)_560px_24px] gap-1 sm:p-10 sm:pt-1">
      <>
        {/* price display */}
        <PriceDisplay symbol={defaultSymbol} />
        {/* order book */}
        <OrderBook symbol={defaultSymbol} />
        {/* candle chart */}
        <CandleChart symbol={defaultSymbol} />
        {/* Market Tab */}
        <Market symbol={defaultSymbol} />
        {/* Trades Tab */}
        <Trades symbol={defaultSymbol} />
        {/* Order Form Tab */}
        <OrderForm symbol={defaultSymbol} />
        {/* Market Activity Tab */}
        <MarketActivity symbol={defaultSymbol} />
      </>
    </div>
  )
}

export default page