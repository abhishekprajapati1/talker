import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    @ApiProperty()
    email: string;
}
