import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";


async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        query: { id },
        session: { user },
    } = req;

    if (!user) {
        return res.status(401).json({ok: false, error: "Unauthorized" });
    }

    try {
        await client.answer.delete({
            where: {
                id: Number(id),
                userId: user.id,
            },
        });
        return res.json({ ok: true });
    } catch (err) {
        return res.status(500).json({ok: false, error: "Internal Server Error" });
    }
}

export default  withApiSession(withHandler({
    methods: ["DELETE"],
    handler,
}));