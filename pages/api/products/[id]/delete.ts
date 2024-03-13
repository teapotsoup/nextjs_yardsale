import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { Prisma } from '@prisma/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        query:{id},
    } =req;
    const deletingProduct = await client.product.delete({
        where: {
            id: Number(id),
        },
    })
    try {
        return res.json({
            ok:true,
        })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
           console.log('프리즈마 에러 : ',err )
        }
        else{
            console.log('걍 에러 : ',err )
        }
        return res.status(500);
    }

}

export default  withApiSession(withHandler({
  methods: ["DELETE"],
  handler,
}));