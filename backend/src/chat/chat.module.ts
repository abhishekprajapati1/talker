import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';
import { TokenModule } from '../token/token.module';
import { ChatAuthGuard } from './chat.guard';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [UserModule, TokenModule, ContactModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, ChatAuthGuard]
})
export class ChatModule { }
