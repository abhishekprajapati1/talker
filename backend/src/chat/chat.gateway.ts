import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { Logger, UseGuards } from "@nestjs/common";
import { ChatAuthGuard } from "./chat.guard";
import { ChatAuthMiddleware } from "./chat.middleware";
import { HydratedSocket } from "libs/types";
import { ContactService } from "../contact/contact.service";
import { UserService } from "../user/user.service";
import { SendMessageDto } from "./dto/send-message.dto";

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
        private readonly chatService: ChatService,
        private readonly contactService: ContactService,
        private readonly userService: UserService
    ) { }

    async afterInit(socket: Socket) {
        socket.use(ChatAuthMiddleware() as any)
    }

    @SubscribeMessage('message')
    async listenForMessages(@MessageBody() message: SendMessageDto, @ConnectedSocket() socket: HydratedSocket) {
        const created = await this.chatService.createMessage({ sender_id: socket.user.id, data: message });
        this.server.to(message.conversation_id).emit('message', created);
    }


    @SubscribeMessage('search-new-user')
    async searchUsers(@MessageBody() input: string, @ConnectedSocket() socket: HydratedSocket) {
        let foundContacts = await this.contactService.findAllByNameOrEmail({ user_id: socket.user.id, input });
        let foundUsers = await this.userService.findAllByNameOrEmail(input);

        let preparedUsers = [];

        for (let contact of foundContacts) {
            let foundUser = foundUsers.find(user => user.email === contact.email);
            if (foundUser) { // since we don't have invite feature yet, we need to disable invitation feature temporarily
                preparedUsers.push({ isTalkerUser: Boolean(foundUser), data: foundUser || contact }); // this code will send contact information of the user who is not registered on talker
            }
        }
        socket.emit('user-search-result', preparedUsers)
    }

    async handleConnection(socket: HydratedSocket, ...args: any[]): Promise<void> {
        Logger.log("client connected");
        // here we will let user join the rooms first...
        const rooms = await this.chatService.getAllConversationIds(socket.user.id);
        socket.join(rooms)
    }
}