import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class WsAuthGaurd implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const socket = context.switchToWs().getClient();
        console.log("see this socket", socket);
        return true;
    }
}