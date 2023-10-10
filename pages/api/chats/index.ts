import {withApiSession} from "@libs/server/withSession";
import withHandler, {ResponseType} from "@libs/server/withHandler";
import {NextApiRequest, NextApiResponse} from "next";
import client from "@libs/server/client";


async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    if (req.method === "GET") {

        const {
            session: { user },
        } = req;

        const chatrooms = await client.chatroom.findMany({
            where: {
                OR: [{ buyerId: user?.id }, { sellerId: user?.id }],
            },
            include: {
                chatMessages: {
                    select: {
                        message: true,
                        createdAt: true,
                        userId: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                buyer: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
                seller: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
                product:{
                    select: {
                        name: true,
                    },
                }
            },
        });
        res.json({
            ok: true,
            chatrooms,
        });
    }
    if (req.method === 'POST') {
        const {
            query: { productId, sellerId },
            session: { user },
        } = req;

        if (sellerId === user?.id) return;

        const existingChatroom = await client.chatroom.findFirst({
            where: {
                productId: Number(productId),
                buyerId: Number(user?.id),
                sellerId: Number(sellerId),
            },
        });

        if (existingChatroom) {
            res.json({
                ok: true,
                chatroomId: existingChatroom.id,
            });
        } else {
            const chatroom = await client.chatroom.create({
                data: {
                    product: {
                        connect: {
                            id: Number(productId),
                        },
                    },
                    buyer: {
                        connect: {
                            id: Number(user?.id),
                        },
                    },
                    seller: {
                        connect: {
                            id: Number(sellerId),
                        },
                    },
                },
            });

            res.json({
                ok: true,
                chatroomId: chatroom.id,
            });
        }
    }

}

export default withApiSession(
    withHandler({
        methods: ["GET", "POST"],
        handler,
    })
);
