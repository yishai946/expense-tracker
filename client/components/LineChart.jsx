// BalanceChart.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useHomeContext } from "../context/HomeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "30-days overview",
    },
  },
};

const LineChart = () => {
  const { balances, incomes, expenses } = useHomeContext();
  const labels = balances.map((entry) => entry.date);

  const data = {
    labels,
    datasets: [
      {
        label: "Balance",
        data: balances.map((entry) => entry.total),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Expenses",
        data: expenses.map((entry) => entry.total),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Incomes",
        data: incomes.map((entry) => entry.total),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    balances &&
    expenses &&
    incomes && (
      <div className="chartContainer">
        <Line options={options} data={data} />
      </div>
    )
  );
};

export default LineChart;
