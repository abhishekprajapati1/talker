import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsNotEmpty } from "class-validator";

export class LoginDto {
    @Allow()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @Allow()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}