import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { getBinanceChartData } from '../../utils/fetchBinanceData';
import { useQuery } from '@tanstack/react-query';

function CandleChart({ symbol }) {
  const [interval, setInterval] = useState("1d")

  const { data: binanceChartData, isLoading } = useQuery({
    queryKey: ["binanceChartData", interval, symbol],
    queryFn: async () => {
      const result = await getBinanceChartData(interval, symbol)
      // api 호출 실패 시
      if (!result || result.length === 0) {
        console.warn("No data returned or data is empty")
        throw new Error('Network response was not ok')
      }

      // 데이터 형식
      // [
      //   [
      //     1499040000000,      // Kline open time
      //     "0.01634790",       // Open price
      //     "0.80000000",       // High price
      //     "0.01575800",       // Low price
      //     "0.01577100",       // Close price
      //     "148976.11427815",  // Volume
      //     1499644799999,      // Kline Close time
      //     "2434.19055334",    // Quote asset volume
      //     308,                // Number of trades
      //     "1756.87402397",    // Taker buy base asset volume
      //     "28.46694368",      // Taker buy quote asset volume
      //     "0"                 // Unused field, ignore.
      //   ]
      // ]

      // 데이터 형식 변환
      const prices = result.map(([time, open, high, low, close, volume, closeTime, quoteAssetVolume, trades, takerBuyBaseAssetVolume, takerBuyQuoteAssetVolume, unused]) => ({
        x: time,
        y: [open, high, low, close]
      }))

      // api 호출 성공 시
      return prices
    },
  });

  const [state, setState] = useState({
    series: [{
      data: []
    }],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        type: 'candlestick',
        height: 350,
      },
      title: {
        // text: 'CandleStick Chart',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        tooltip: {
          enabled: true,
        }
      },
      tooltip: {
        enabled: true,
        followCursor: true,
        hideEmptySeries: true,
        fillSeriesColor: false,
        theme: false,
      },
    },
  });

  useEffect(() => {
    if (binanceChartData) {
      setState({
        ...state,
        series: [{
          data: binanceChartData
        }]
      })
    }
  }, [binanceChartData])

  return binanceChartData && (
    <div className='bg-[--background-card] text-white rounded-lg row-start-2 row-end-4'>
      <div id="chart">
        <Chart options={state.options} series={state.series} type="candlestick" height={350} />
      </div>
    </div>
  );
}

export default CandleChart