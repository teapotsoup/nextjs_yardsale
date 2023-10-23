import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
        const {
            query:{id},
            body:{question}
        } =req;
        const  updateQuestion = await client.post.update({
                where:{
                    id:Number(id)
                },
                data:{
                    question: String(question)
                }
            }
        )
        try {
            await res.revalidate(`/community/${id}`)
            return res.json({ ok: true, question: updateQuestion });
        } catch (err) {
            return res.status(500);
        }
}

export default  withApiSession(withHandler({
    methods: ["PATCH"],
    handler,
}));