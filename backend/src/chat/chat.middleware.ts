import { Socket } from "socket.io";
import { ChatAuthGuard } from "./chat.guard";
import { NextFunction } from "express";
import { Logger, UnauthorizedException } from "@nestjs/common";

export type ChatAuthMiddleware = {
    (socket: Socket, next: (err?: Error) => void)
}

export const ChatAuthMiddleware = (): ChatAuthMiddleware => {
    return (client: any, next: NextFunction) => {
        try {
            const connectedUser = ChatAuthGuard.validateToken(client);
            if (!connectedUser) throw new UnauthorizedException("You must be logged in");
            client.user = connectedUser;
            next();
        } catch (error) {
            next(error);
        }
    }
}