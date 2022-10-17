// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top" as const,
//     },
//     title: {
//       display: true,
//       text: "Chart.js Bar Chart",
//     },
//   },
// };

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [1, 2, 3, 4, 5],
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: [1, 2, 3, 4, 5],
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

// export function Tester() {
//   return <Bar options={options} data={data} />;
// }

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ChartData {
  year: string;
  tot_ppltn: string;
}
export function Tester(props: any) {
  // const data = [
  //   {
  //     year: "Page A",
  //     uv: "4000",
  //     tot_ppltn: "2400",
  //   },
  //   {
  //     year: "Page B",
  //     uv: 3000,
  //     tot_ppltn: 1398,
  //   }
  // ];
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [maxData, setMaxData] = useState(0);

  useEffect(() => {
    setChartData(props.data);
    setMaxData(
      Math.max.apply(
        null,
        chartData.map((ele) => Number(ele.tot_ppltn))
      )
    );
    // console.log(chartData.tot_ppltn);
  }, [props.data]);

  useEffect(() => {
    async function fetchAndSetUser() {
      await setMaxData(
        Math.max.apply(
          null,
          chartData.map((ele) => Number(ele.tot_ppltn))
        )
      );
      // const a = Math.pow(10, Number(maxData.toString().length) - 1);
      // console.log(maxData);
      // await setMaxData((maxData / a) * a);
      //10000 같이 000으로 할거고민
    }
    fetchAndSetUser();
  }, [chartData]);
  // console.log(chartData);
  return (
    <>
      <BarChart
        width={500}
        height={500}
        data={chartData}
        margin={{
          top: 150,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="year" />
        <YAxis dataKey="tot_ppltn" domain={[0, maxData]} />
        <Tooltip />
        <Legend />

        <Bar dataKey="tot_ppltn" name="인구수" fill="#8884d8" />
      </BarChart>
    </>
  );
}
