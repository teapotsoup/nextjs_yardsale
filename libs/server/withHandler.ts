import { NextApiRequest, NextApiResponse } from "next";
import React from "react";

type method = "GET"|"POST"|"DELETE"

type ConfigType={
  methods:method[],
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
  isPrivate?:boolean
}

export type ResponseType={
  ok:boolean;
  [key:string]:any
}



export default function withHandler(
  {methods, isPrivate=true, handler}: ConfigType
) {
  return async function (req: NextApiRequest, res: NextApiResponse):Promise<any> {
    if(req.method && !methods.includes(req.method as any )){
      return res.status(405).end()
    }
    if(isPrivate && !req.session.user){
      return res.status(401).json({ok:false, error: "plz log in"})  
    }
    try{
      console.log("핸들러함수 진입")
      await handler(req,res)
    }catch(error){
      console.log(error);
      return res.status(500).json({error})
    }
  };
}
