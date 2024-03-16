import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { Logger, UseGuards } from "@nestjs/common";
import { ChatAuthGuard } from "./chat.guard";
import { ChatAuthMiddleware } from "./chat.middleware";
import { IMessage } from "libs/types";

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
    listenForMessages(@MessageBody() message: IMessage) {
        console.log("see this message", message)
    }


    @SubscribeMessage('search-new-user')
    searchUsers(@MessageBody() input: string) {
        this.server.emit('user-search-result', [input])
    }

    handleConnection(socket: any, ...args: any[]): void {
        Logger.log("client connected");
    }
}