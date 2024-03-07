import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";


async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    if(req.method === "GET"){
        const {
            session: { user },
        } = req;

        const answers = await client.answer.findMany({
            where:{
                userId:user?.id,
            },
        })
        res.json({
            ok:true,
            answers
        })
    }
}

export default  withApiSession(withHandler({
    methods: ["GET"],
    handler,
}));