import { Body, Controller, Get, Logger, Param, Post, Query, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { RequestWithAll } from 'libs/types';
import { UserService } from '../user/user.service';
import { GetConversationDto } from './dto/get-conversation.dto';

@Controller('chats')
export class ChatController {
    constructor(private readonly chatService: ChatService, private readonly userService: UserService) { }

    @Post("start")
    async startConversation(@Body('user_id') user_id: string, @Req() req: RequestWithAll) {
        const conversation = await this.chatService.createIndividualConversation([user_id, req.user.id]);
        return { success: true, data: { conversation_id: conversation.id } }
    }

    @Get("")
    async getConversations(@Req() req: RequestWithAll) {
        const conversations = await this.chatService.findConversationsByUserId(req.user.id);
        return { success: true, data: conversations }
    }

    @Get(":conversation_id")
    async getConversationDetails(@Req() req: RequestWithAll, @Param() param: GetConversationDto) {
        const details = await this.chatService.findConversationByConversationId(param.conversation_id, req.user.id);
        return { success: true, data: details };
    }
    @Get(":conversation_id/messages")
    async getMessages(@Param() param: GetConversationDto) {
        const details = await this.chatService.getMessagesByConversationId(param.conversation_id);
        return { success: true, data: details };
    }
}
