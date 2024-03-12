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
            body:{answer}
        } =req;
        const  updateQuestion = await client.answer.update({
                where:{
                    id:Number(id)
                },
                data:{
                    answer
                }
            }
        )
        try {
            await res.revalidate(`/community/${id}`)
            return res.json({ ok: true, answer: updateQuestion });
        } catch (err) {
            return res.status(500);
        }
}

export default  withApiSession(withHandler({
    methods: ["PATCH"],
    handler,
}));