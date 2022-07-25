import client from '@libs/server/client'
import withHandler from '@libs/server/withHandler'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body.data)
  console.log(req.body.data.email||req.body.data.phone)
  //req.body는 조회불가.
  //해결하려면 headers를 설정해야한다
  //libs/client/useMutation파일에서 헤더스 설정해야한다
  return res.status(200).end()
}

export default withHandler("POST",handler)