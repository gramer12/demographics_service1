import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
//import { Population } from "@prisma/client";
import { Population } from "@prisma/client";
interface Data {
  ok: boolean;
  error?: String;
  regoin?: String;
  resData?: String;
}
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method !== "GET") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다. : ${request.method}`,
    });
    return;
  }

  try {
    const regoin = await client.population.findMany({
      where: request.query,
      orderBy: {
        year: "asc",
      },
    });

    const resData = JSON.stringify(
      regoin.map((ele: Population) => ({
        year: ele.year,
        tot_ppltn: ele.tot_ppltn,
        adm_nm: ele.adm_nm,
      }))
    );

    response.status(200).json({ ok: true, resData });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외가 있던ㅇ벗던 실행되는 블럭
    await client.$disconnect();
  }
}
