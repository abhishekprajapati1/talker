import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
    constructor(
        private readonly userService: UserService
    ) { }

    async getUserFromSocket(socket: Socket) {
        let auth_token = socket.handshake.headers.cookie;
        console.log("see auth token", auth_token);
    }
}
