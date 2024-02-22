import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';
import { TokenModule } from '../token/token.module';
import { ChatAuthGuard } from './chat.guard';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, ChatAuthGuard]
})
export class ChatModule { }
