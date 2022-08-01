import { NextApiRequest, NextApiResponse } from "next";
import React from "react";


export type ResponseType={
  ok:boolean;
  [key:string]:any
}
export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if(req.method !==method){
      return res.status(405).end()
    }
    try{
      console.log("핸들러함수 진입")
      await fn(req,res)
    }catch(error){
      console.log(error);
      return res.status(500).json({error})
    }
  };
}
