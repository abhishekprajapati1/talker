import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Socket } from "socket.io";
import * as jwt from 'jsonwebtoken';
import { TOKENS } from "libs/constants";

@Injectable()
export class ChatAuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext) {
        if (context.getType() !== "ws") return true;
        const socket = context.switchToWs().getClient();
        const connectedUser = ChatAuthGuard.validateToken(socket);
        if (!connectedUser) return false;
        return true;
    }

    static validateToken(socket: Socket) {
        const cookies = this.getCookies(socket.handshake?.headers?.cookie);
        if (!cookies || Object.keys(cookies).length <= 0) throw new UnauthorizedException("Please login first");
        const payload = jwt.verify(cookies[TOKENS.auth_token], process.env.APP_SECRET_KEY);
        return payload;
    }

    static getCookies(cookie: string) {
        let cookies = {};
        if (cookie) {
            let parts = cookie.split("; ");
            parts.forEach(part => {
                let parts = part?.split("=");
                let key = (Array.isArray(parts) && parts.length === 2) ? parts?.[0] : null;
                if (key) {
                    cookies[key] = parts[1];
                }
            })
        }
        return cookies;
    }
}