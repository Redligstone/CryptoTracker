import React, { useRef, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../cryptoContext";
import {
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const CoinInfo = ({ coin }) => {
  const { currency } = CryptoState();

  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const chartRef = useRef(null);

  const FetchChart = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };
  useEffect(() => {
    FetchChart();
  }, [currency, days]);

//   const chartData = {
//     labels: historicalData.map((data) => {
//       let date = new Date(data[0]);
//       let time =
//         date.getHours() > 12
//           ? `${date.getHours() - 12}:${date.getMinutes()} PM`
//           : `${date.getHours()}:${date.getMinutes()} AM`;
//       return days === 1 ? time : date.toLocaleDateString();
//     }),
//     datasets: [
//       {
//         label: `Price (Past ${days} Days) in ${currency}`,
//         data: historicalData.map((data) => data[1]),
//         borderColor: "#EEBC1D",
//       },
//     ],
//   };
  const chartData = useMemo(() => {
    const mappedData = historicalData.map((data) => {
      let date = new Date(data[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    });

    return {
      labels: mappedData,datasets: [
        {
          label: `Price (Past ${days} Days) in ${currency}`,
          data: historicalData.map((data) => data[1]),
          borderColor: "#EEBC1D",
        },
      ],
    };
  }, [currency, days, historicalData]);

  const chartOptions = useMemo(() => {
    return {
      scales: {
        xAxes: [
          {
            type: "category",
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20,
              callback: function (value, index, values) {
                return value.split(" ")[0];
              },
              beginAtZero: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 2,
        },
      },
    };
  }, []);
//   const chartOptions = {
//     scales: {
//       xAxes: [
//         {
//           type: "category",
//           ticks: {
//             autoSkip: true,
//             maxTicksLimit: 20,
//             callback: function (value, index, values) {
//               return value.split(" ")[0];
//             },
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//     elements: {
//       point: {
//         radius: 2,
//       },
//     },
//   };

  useEffect(() => {
    let chartInstance = null;
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      const ctx = chartRef.current.getContext("2d");
      chartInstance = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });
    }
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartData, chartOptions]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="chart__container">
        <>
        {!historicalData.length ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <Line data={chartData} options={chartOptions} ref={chartRef} />
        )}
        </>
        <div className="chart__buttons">
            {chartDays.map(day => 
            (
                <SelectButton selected={day.value === days} key={day.value}  onClick={() => {setDays(day.value)}}>{day.label}</SelectButton>
            ))}
        </div>
        

      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
