import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {

    @ApiProperty()
    @IsEmail()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    email: string;

    @ApiProperty()
    @IsStrongPassword()
    password: string;

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty()
    name: string;
}
