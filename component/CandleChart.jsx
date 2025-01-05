import React, { useState } from 'react'
import Chart from "react-apexcharts";

function CandleChart({ prices }) {
  const [state, setState] = useState({
    series: [{
      data: prices
    }],
    options: {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'CandleStick Chart',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        tooltip: {
          enabled: false,
          followCursor: false,
          style: {
            fontSize: '12px',
            fontFamily: undefined,
            color: '#FFF',
            followCursor: false,
            fillSeriesColor: "black",
          },
        }
      }
    },
  });

  return prices.length > 0 && (
    <div>
      <div id="chart">
        <Chart options={state.options} series={state.series} type="candlestick" height={350} />
      </div>
    </div>
  );
}

export default CandleChart