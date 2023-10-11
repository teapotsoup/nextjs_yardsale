import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where:{
      payload:token
    },
    include:{user:true}
  })

  // 로컬과 ip 모두 동일하게 나온다
  // console.log("db에서 찾은 유저 토큰 : ", foundToken) // 다 잘 나온다
  // console.log("세션 유저 아이디 넣기 전 : ", req.session) // 로컬기준 -> {}
  // console.log("세션 유저 아이디 넣기 전 : ", req.session.user) // 로컬기준 -> 세션 유저 아이디 넣기 전 :  undefined
  if (!foundToken) return res.status(404).end()
  req.session.user={
    id:foundToken.userId
  }
  // console.log("세션 유저 아이디 넣은 후 : ", req.session.user) // 로컬기준 -> 세션 유저 아이디 넣은 후 :  { id: 4 }
  await req.session.save() // 쿠키 생성
  await client.token.deleteMany({
    where:{
      userId:foundToken.userId
    }
  })
  res.json({ok:true});
}

export default  withApiSession(withHandler({
  methods: ["POST"],
  handler,
  isPrivate:false
}));