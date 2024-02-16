import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class LoginDto {
    @Allow()
    @ApiProperty()
    email: string;

    @Allow()
    @ApiProperty()
    password: string;
}