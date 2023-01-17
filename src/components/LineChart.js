import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { tickCallback } from "../lib/utlis";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

function LineChart({ data, changeColor }) {
  const changeClr = changeColor === "green" ? "rgba(0,212,0" : "rgba(255,0,0";
  const options = {
    animation: false,
    responsive: true,
    elements: {
      point: {
        radius: 4,
      },
    },
    scales: {
      y: {
        position: "right",
        ticks: {
          font: {
            size: 13,
            weight: "bold",
          },
          maxTicksLimit: 5,
          callback: tickCallback,
        },
        grid: { color: "rgba(142, 142, 147, 0.3)" },
      },
      x: {
        ticks: {
          font: {
            size: 13,
            weight: "bold",
          },
          maxRotation: 0,
          maxTicksLimit: 4,
        },
        grid: { color: "rgba(142, 142, 147, 0.3)" },
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        borderColor: `${changeClr},1)`,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 100);
          gradient.addColorStop(0, `${changeClr},1)`);
          gradient.addColorStop(1, `${changeClr},0)`);
          return gradient;
        },
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}

LineChart.propTypes = {
  data: PropTypes.object.isRequired,
  changeColor: PropTypes.string.isRequired,
};

export default LineChart;
