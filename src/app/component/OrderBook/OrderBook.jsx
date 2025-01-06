import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getBinanceDepth } from '../../utils/fetchBinanceData'
import { useSymbolStore } from '../../hooks/stateManagement';

const OrderBook = () => {
  const { defaultSymbol } = useSymbolStore();

  const { data: depth } = useQuery({
    queryKey: ['depth', defaultSymbol],
    queryFn: () => getBinanceDepth(defaultSymbol),
  })

  return (
    <div className="bg-[--background-card] text-white items-center flex rounded-lg row-start-2 row-end-6">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span>BTC/USDT</span>
          <span>100</span>
        </div>

        <div className="flex justify-between">
          <span>BTC/USDT</span>
          <span>100</span>
        </div>
      </div>
    </div>
  )
}

export default OrderBook