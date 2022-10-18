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
  const [province, setProvince] = useState("");

  useEffect(() => {
    setChartData(props.data);
    setMaxData(
      Math.max.apply(
        null,
        chartData.map((ele) => Number(ele.tot_ppltn))
      )
    );
    if (props.data[0]) {
      setProvince(props.data[0].adm_nm);
    }

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
        <YAxis
          dataKey="tot_ppltn"
          domain={[
            0,
            Math.ceil(
              maxData / Math.pow(10, Number(maxData.toString().length) - 1)
            ) * Math.pow(10, Number(maxData.toString().length) - 1),
          ]}
        />{" "}
        <Tooltip />
        <Legend />
        <Bar dataKey="tot_ppltn" name={`${province}의 인구수`} fill="#8884d8" />
      </BarChart>
    </>
  );
}
