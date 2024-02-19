import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";


@WebSocketGateway({
    cors: {
        credentials: true,
        allowedHeaders: ["*", "content-type", "authorization"],
        origin: ["http://localhost:3000"]
    }
})
export class ChatGateway implements OnGatewayConnection {

    @WebSocketServer()
    server: Server;

    constructor(
        private readonly chatService: ChatService
    ) { }


    async handleConnection(socket: Socket, ...args: any[]) {
        await this.chatService.getUserFromSocket(socket);
    }

    @SubscribeMessage('message')
    listenForMessages(@MessageBody() message: string) {
        console.log("see this message", message)
    }
}