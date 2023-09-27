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

    switch (kind) {
        case Kind.Fav:
        case Kind.Purchase:
        case Kind.Sale:
            const products = await client.record.findMany({ // /api/users/me/records?kind=fav
                where: {
                    id: user!.id,
                    kind,
                },
            });
            res.json({ ok: true, products });
            break;
        default:
            res.json({ ok: false });
    }
}

export default withApiSession(
    withHandler({ methods: ['GET'], handler, isPrivate: true })
);