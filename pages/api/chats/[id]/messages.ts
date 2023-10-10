import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        query: { id },
        body,
        session: { user },
    } = req;
    const message = await client?.chatmessage.create({
        data: {
            message: body.message,
            chatroom: {
                connect: {
                    id: Number(id),
                },
            },
            user: {
                connect: {
                    id: user?.id,
                },
            },
        },
    });

    res.json({
        ok: true,
        message,
    });
}
export default withApiSession(
    withHandler({
        methods: ['POST'],
        handler,
    })
);