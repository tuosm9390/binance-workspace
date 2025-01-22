'use client'

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getBinanceChartData } from "../../utils/fetchBinanceData";
import { useQuery } from "@tanstack/react-query";
import { useSymbolStore } from "../../hooks/stateManagement";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function CandleChart() {
  const [interval, setInterval] = useState("1h");
  const { defaultSymbol } = useSymbolStore();

  // 초기 데이터 호출
  const { data: binanceChartData, isLoading } = useQuery({
    queryKey: ["binanceChartData", interval, defaultSymbol],
    queryFn: async () => {
      const result = await getBinanceChartData(interval, defaultSymbol);
      // api 호출 실패 시
      if (!result || result.length === 0) {
        console.warn("No data returned or data is empty");
        throw new Error("Network response was not ok");
      }

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
          x: new Date(time).getTime(),
          y: [open, high, low, close],
        })
      );

      // api 호출 성공 시
      return prices;
    },
    enabled: !!defaultSymbol
  });

  const [state, setState] = useState({
    series: [
      {
        data: binanceChartData && binanceChartData,
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
        labels: {
          style: {
            colors: "white",
          },
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm',
            minute: 'HH:mm:ss',
            second: 'HH:mm:ss',
          },
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
        },
      },
      yaxis: {
        type: "price",
        tooltip: {
          enabled: true,
        },
        labels: {
          style: {
            colors: "white",
          },
        }
      },
      tooltip: {
        enabled: true,
        followCursor: true,
        hideEmptySeries: true,
        fillSeriesColor: false,
        theme: false,
        x: {
          format: "yyyy.MM.dd hh:mm",
        },
      },
    },
  });

  useEffect(() => {
    if (binanceChartData) {
      setState({
        ...state,
        series: [
          {
            data: binanceChartData && binanceChartData,
          },
        ],
      });
    }
  }, [binanceChartData]);

  return (
    <div className="bg-[--background-card] text-white rounded-lg row-start-2 row-end-4">
      <div id="chart">
        {binanceChartData && (
          <Chart
            options={state?.options}
            series={state?.series}
            type="candlestick"
            height={500}
          />
        )}
      </div>
    </div>
  );
}

export default CandleChart;
