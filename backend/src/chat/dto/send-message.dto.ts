import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";


class MessageBodyDto {
    @IsString()
    @IsNotEmpty()
    text: string;
}


export class SendMessageDto {
    @IsString()
    @IsNotEmpty()
    conversation_id: string;
    

    @IsObject()
    @ValidateNested()
    body: MessageBodyDto;
}
