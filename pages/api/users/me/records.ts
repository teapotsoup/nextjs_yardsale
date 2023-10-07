import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { Kind } from "@prisma/client";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        session: { user },
        query: { kind },
    } = req;
    const records = await client.record.findMany({ // 브라우저 엔드포인트 /api/users/me/records?kind=[Fav || Sale || Purchase]
        where: {
          userId: user?.id,
          kind: kind as Kind,
        },
        include: {
            product:{
                include:{
                    _count:{
                        select:{
                            favs: true,
                        }
                    }
                }
            }
            // product: true,
          },
      });
      res.status(200).json({ ok: true, records });
}

export default withApiSession(
    withHandler({ methods: ['GET'], handler, isPrivate: true })
);