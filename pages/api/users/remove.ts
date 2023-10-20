import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  console.log("세션의 유저 : ", user)
  if(user){
    // @ts-ignore
    await req.session.destroy(()=>{});
    return res.json({ok:true});
  }
  return res.json({ok:false});
}

export default  withApiSession(withHandler({
  methods: ["POST"],
  handler,
}));