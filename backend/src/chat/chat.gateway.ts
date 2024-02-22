import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { BadGatewayException, Logger, UseGuards } from "@nestjs/common";
import { ChatAuthGuard } from "./chat.guard";
import { ChatAuthMiddleware } from "./chat.middleware";

@WebSocketGateway({
    cors: {
        credentials: true,
        allowedHeaders: ["*", "content-type", "authorization"],
        origin: ["http://localhost:3000"]
    },

})
@UseGuards(ChatAuthGuard)
export class ChatGateway {

    @WebSocketServer()
    server: Server;

    constructor(
        private readonly chatService: ChatService
    ) { }

    async afterInit(socket: Socket) {
        socket.use(ChatAuthMiddleware() as any)
    }

    @SubscribeMessage('message')
    listenForMessages(@MessageBody() message: string) {
        console.log("see this message", message)
    }
}