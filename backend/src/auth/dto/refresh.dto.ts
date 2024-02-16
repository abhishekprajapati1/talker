import { REFRESH_TOKEN_TYPES } from "libs/constants";
import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class RefreshTokenDto {
    @Allow()
    @ApiProperty()
    type: REFRESH_TOKEN_TYPES;
}