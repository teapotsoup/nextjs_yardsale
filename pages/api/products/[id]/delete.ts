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
    } =req;
    const deletedProduct = await client.product.delete({
        where: {
            id: Number(id),
        },
    })
    try {
        return res.json({
            ok:true,
        })
    } catch (err) {
        return res.status(500);
    }

}

export default  withApiSession(withHandler({
  methods: ["DELETE"],
  handler,
}));