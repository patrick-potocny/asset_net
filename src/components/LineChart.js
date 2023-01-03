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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

function LineChart({ data }) {
  console.log(data);

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        borderColor: "#00D400",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="chart">
      <Line options={options} data={chartData} />
    </div>
  );
}

LineChart.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LineChart;
