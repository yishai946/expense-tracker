import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import randomColor from "randomcolor";
import { useHomeContext } from "../context/HomeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PiChart() {
  const { expensesByCategory } = useHomeContext();

  // Helper function to generate an array of random colors
  const generateRandomColors = (numColors) => {
    return randomColor({
      count: numColors,
    //   luminosity: "bright",
      format: "rgba", // Use RGBA format for transparency
    });
  };

  // Use useMemo to generate colors once and memoize the result
  const colors = useMemo(() => generateRandomColors(expensesByCategory.length), [expensesByCategory]);

  const data = {
    labels: expensesByCategory.map((entry) => entry._id),
    datasets: [
      {
        label: "Total: ",
        data: expensesByCategory.map((entry) => entry.total),
        backgroundColor: colors,
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    expensesByCategory && (
      <div className="piContainer">
        <Doughnut data={data} />
      </div>
    )
  );
}
