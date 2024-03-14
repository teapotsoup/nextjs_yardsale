// pages/api/socket.ts
import {Server as ServerIO, Server} from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import {Socket} from "net";
import {Server as NetServer} from "http";

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: ServerIO;
        }
    }
}
export default function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);
        io.on("connection", (socket) => {
            console.log(`Socket ${socket.id} connected.`);
            socket.on("message", (message) => {
                io.emit("message", message);
            });
            socket.on("disconnect", () => {
                console.log(`Socket ${socket.id} disconnected.`);
            });
        });
        res.socket.server.io = io;
    }
    res.end();
}
