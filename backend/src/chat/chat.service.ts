import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Socket } from 'socket.io';
import { TokenService } from '../token/token.service';
import { TOKENS } from 'libs/constants';
import { WsException } from '@nestjs/websockets';
import { ChatAuthGuard } from './chat.guard';

@Injectable()
export class ChatService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) { }

    

    async getUserFromSocket(socket: Socket) {
        let cookies = ChatAuthGuard.getCookies(socket.handshake?.headers?.cookie);
        let userPayload = await this.tokenService.verifyToken(cookies[TOKENS.auth_token]);
        if (!userPayload) {
            return null;
        }
        return await this.userService.findOne(userPayload.id);
    }
}
