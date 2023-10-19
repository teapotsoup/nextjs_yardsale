import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {query:{id}, session:{user}} = req;
    const product = await client.product.findUnique({
        where:{
            id: Number(id)
        },
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    avatar:true
                }
            },
        }
    })
    const terms = product?.name.split(" ").map((word: string)=>({
        name:{
            contains: word,
        }
    }))
    const relatedProducts = await client.product.findMany({
        where: {
            OR : terms,
            NOT : {
                id : product?.id
            }
        }
    });
    const isLiked = Boolean(
        await client.record.findFirst({
            where:{
                productId:product?.id,
                userId:user?.id,
                kind:'Fav'
            },
            select:{
                id:true
            }
        })
    )
    res.json({ok:true,product, isLiked,relatedProducts,userId:user?.id})
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
