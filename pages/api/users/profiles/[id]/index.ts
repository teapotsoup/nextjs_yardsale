import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";



async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {query:{id}} = req;
        const profile = await client.user.findUnique({
            where:{id:Number(id)},
                select:{
                    createdAt:true,
                    name:true,
                    receivedReviews:true,
                    products:{
                        select:{
                            id:true,
                            favs:true,
                            price:true,
                            name:true,
                        }
                    }
                }
        })
        res.json({
            ok:true,
            profile
        })
}

export default  withApiSession(withHandler({
    methods: ["GET"],
    handler
}));