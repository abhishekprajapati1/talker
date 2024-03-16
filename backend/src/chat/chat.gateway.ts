import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { Logger, UseGuards } from "@nestjs/common";
import { ChatAuthGuard } from "./chat.guard";
import { ChatAuthMiddleware } from "./chat.middleware";
import { HydratedSocket, IMessage } from "libs/types";
import { ContactService } from "../contact/contact.service";
import { UserService } from "../user/user.service";

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
    listenForMessages(@MessageBody() message: IMessage, @ConnectedSocket() socket: HydratedSocket) {
        // check if conversation exists for both sender and reciever
        

        console.log("see this message", message)
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
        this.server.emit('user-search-result', preparedUsers)
    }

    handleConnection(socket: HydratedSocket, ...args: any[]): void {
        Logger.log("client connected");
    }
}