import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [UserModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway]
})
export class ChatModule { }
