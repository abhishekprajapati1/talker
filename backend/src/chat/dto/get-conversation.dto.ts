import { IsNotEmpty, IsString } from "class-validator";

export class GetConversationDto {
    @IsString()
    @IsNotEmpty()
    conversation_id: string;
}