import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getBinanceChartData } from "../../utils/fetchBinanceData";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function CandleChart({ symbol }) {
  const [interval, setInterval] = useState("1h");

  // 초기 데이터 호출
  const { data: binanceChartData, isLoading } = useQuery({
    queryKey: ["binanceChartData", interval, symbol],
    queryFn: async () => {
      const result = await getBinanceChartData(interval, symbol);
      // api 호출 실패 시
      if (!result || result.length === 0) {
        console.warn("No data returned or data is empty");
        throw new Error("Network response was not ok");
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
      const prices = result.map(
        ([
          time,
          open,
          high,
          low,
          close,
          volume,
          closeTime,
          quoteAssetVolume,
          trades,
          takerBuyBaseAssetVolume,
          takerBuyQuoteAssetVolume,
          unused,
        ]) => ({
          x: time,
          y: [open, high, low, close],
        })
      );

      // api 호출 성공 시
      return prices;
    },
  });

  const [state, setState] = useState({
    series: [
      {
        data: binanceChartData,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        type: "candlestick",
        height: 500,
      },
      title: {
        // text: 'CandleStick Chart',
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
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

  // 웹소켓 연결
  const queryClient = useQueryClient();
  useEffect(() => {
    const websocket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);
    websocket.onopen = () => {
      return
    };
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // WebSocket 데이터를 chart 형식으로 변환
      const transformedData = {
        x: data.k.t,  // Kline open time
        y: [
          parseFloat(data.k.o),  // Open price
          parseFloat(data.k.h),  // High price
          parseFloat(data.k.l),  // Low price
          parseFloat(data.k.c),  // Close price
        ]
      };

      queryClient.setQueryData(
        ["binanceChartData", interval, symbol],
        (oldData) => {
          if (!oldData) return [transformedData];

          // 마지막 캔들의 시간과 새로운 데이터의 시간 비교
          const lastCandle = oldData[oldData.length - 1];
          if (lastCandle.x === transformedData.x) {
            // 같은 시간대의 캔들이면 업데이트
            return [...oldData.slice(0, -1), transformedData];
          } else {
            // 새로운 시간대의 캔들이면 추가
            return [...oldData, transformedData];
          }
        }
      );
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);

  useEffect(() => {
    if (binanceChartData) {
      setState({
        ...state,
        series: [
          {
            data: binanceChartData,
          },
        ],
      });
    }
  }, [binanceChartData]);

  return (
    <div className="bg-[--background-card] text-white rounded-lg row-start-2 row-end-4">
      <div id="chart">
        <Chart
          options={state.options}
          series={state.series}
          type="candlestick"
          height={500}
        />
      </div>
    </div>
  );
}

export default CandleChart;
