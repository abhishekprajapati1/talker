import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Socket } from 'socket.io';
import { TokenService } from '../token/token.service';
import { TOKENS } from 'libs/constants';
import { ChatAuthGuard } from './chat.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly prisma: PrismaService,
    ) { }


    async createIndividualConversation(user_ids: string[]) {
        let existing = await this.prisma.conversation.findFirst({
            where: {
                participants: {
                    every: {
                        user_id: {
                            in: user_ids
                        }
                    }
                }
            },
            select: { id: true }
        });

        if (existing) return existing;

        // else create a new conversation
        const newConversation = await this.prisma.conversation.create({
            data: {
                participants: {
                    create: user_ids.map(user_id => {
                        return {
                            user: { connect: { id: user_id } }
                        }
                    })
                }
            }, select: { id: true }
        });

        return newConversation;
    }

    async createMessage({ sender_id, data }: { sender_id: string; data: SendMessageDto }) {
        return await this.prisma.message.create({
            data: {
                conversation: { connect: { id: data.conversation_id } },
                sender: { connect: { id: sender_id } },
                body: data.body.text
            },
            select: {
                body: true,
                sender_id: true,
                timestamp: true,
                status: true,
            }
        })
    }

    async findConversationsByUserId(user_id: string) {
        const data = await this.prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        user_id
                    }
                }
            },
            select: {
                id: true,
                messages: {
                    take: 1,
                    select: { body: true, sender_id: true, status: true, timestamp: true, type: true },
                    orderBy: { updated_at: "desc" }
                },
                participants: {
                    where: { user_id: { not: user_id } },
                    select: { user: { select: { id: true, name: true, email: true } } }
                }
            }
        });

        let formatted = [];

        data.forEach(d => {
            let newConversation: any = { ...d };
            newConversation.recent_message = d.messages?.[0];
            newConversation.user = d.participants?.[0]?.user;
            delete newConversation.messages;
            delete newConversation.participants;
            formatted.push(newConversation);
        })

        return formatted;
    }

    async findConversationByConversationId(conversation_id: string, logged_in_user_id: string) {
        const data = await this.prisma.conversation.findUnique({
            where: { id: conversation_id },
            select: {
                id: true,
                participants: {
                    where: { user_id: { not: logged_in_user_id } },
                    select: { user: { select: { id: true, name: true, email: true } } }
                }
            }
        });

        let formatted = {
            ...data,
            user: data.participants?.[0]?.user
        }
        delete formatted.participants;
        return formatted;
    }

    async getMessagesByConversationId(conversation_id: string) {
        return await this.prisma.message.findMany({
            take: 20,
            orderBy: { timestamp: "asc" },
            where: {
                conversation_id
            },
            select: { body: true, id: true, sender_id: true, type: true, status: true, timestamp: true }
        })
    }

    async getUserFromSocket(socket: Socket) {
        let cookies = ChatAuthGuard.getCookies(socket.handshake?.headers?.cookie);
        let userPayload = await this.tokenService.verifyToken(cookies[TOKENS.auth_token]);
        if (!userPayload) {
            return null;
        }
        return await this.userService.findOne(userPayload.id);
    }


    async getAllConversationIds(user_id: string) {
        const data = await this.prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        user_id
                    }
                }
            },
            select: { id: true }
        });

        return data.map(d => d.id);
    }
}
