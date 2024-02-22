import { Socket } from "socket.io";
import { ChatAuthGuard } from "./chat.guard";
import { NextFunction } from "express";

export type ChatAuthMiddleware = {
    (socket: Socket, next: (err?: Error) => void)
}

export const ChatAuthMiddleware = (): ChatAuthMiddleware => {
    return (client: Socket, next: NextFunction) => {
        try {
            ChatAuthGuard.validateToken(client);
            next();
        } catch (error) {
            next(error);
        }
    }
}