import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './chat.gateway';
import { TokenModule } from '../token/token.module';
import { ChatAuthGuard } from './chat.guard';
import { ContactModule } from '../contact/contact.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [UserModule, TokenModule, ContactModule, PrismaModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, ChatAuthGuard]
})
export class ChatModule { }
