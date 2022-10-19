import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
import { Population } from "@prisma/client";
import { useEffect, useState } from "react";
import process from "process";
interface Data {
  ok: boolean;
  error?: String;
  result?: Population;
}

const fetchData = async (adm_cd: string, year: string) => {
  const data = await fetch(
    `https://sgisapi.kostat.go.kr/OpenAPI3/stats/population.json?accessToken=${process.env.accessToken}&year=${year}&adm_cd=${adm_cd}&low_search=1`
  )
    .then((res: any) => res.json())
    .then((json: any) => json.result);

  return data;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  // const [population, setPopulation] = useState({});

  if (request.method !== "GET") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다. : ${request.method}`,
    });
    return;
  }

  try {
    const yearArr: string[] = [
      "2000",
      "2005",
      "2010",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
    ];
    const admCdArr: string[] = [
      //행정동 코드를 나열  후
      // 다삽입 그리고
      //어떻게 부모를 매칭할것인지 생각해야함
    ];
    const accessToken = process.env.accessToken;
    for (const adm_cd of admCdArr) {
      for (const year of yearArr) {
        fetchData(adm_cd, year).then(async (apiData) => {
          apiData = apiData.map((ele: Population) => {
            ele.year = year;
            return ele;
          });

          console.log(apiData);

          const Population = await client.population.createMany({
            data: apiData,
          });
        });
      }
    }
    // console.log(apiData);

    response.status(200).json({ ok: true });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외가 있던ㅇ벗던 실행되는 블럭
    await client.$disconnect();
  }
}
