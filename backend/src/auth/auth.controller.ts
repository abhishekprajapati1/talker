import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadRequestException, Req, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { TokenService } from 'src/token/token.service';
import { MAX_AGES, TOKENS, TOKEN_DATA, TOKEN_EXPIRATIONS } from 'libs/constants';
import { RequestWithAll } from 'libs/types';
import { RefreshTokenDto } from './dto/refresh.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@ApiTags("Authentication")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) { }

  @Public()
  @Post("signup")
  async signup(@Body() createAuthDto: CreateAuthDto) {
    const exist = await this.authService.doesUserExist(createAuthDto.email);
    if (exist) throw new BadRequestException({ success: false, message: "Already registered please login." })
    await this.authService.create(createAuthDto);
    return { success: true, message: "Account created successfully." }
  }

  @Public()
  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const user = await this.authService.userLogin(loginDto);
    const access_token = this.tokenService.generateToken({ id: user.id })
    const refresh_token = this.tokenService.generateToken({ type: TOKENS.refresh_auth_token, data: { id: user.id } }, { expiresIn: TOKEN_EXPIRATIONS[TOKENS.refresh_auth_token] });


    this.tokenService.setCookie(response, { name: TOKENS.auth_token, data: access_token });
    this.tokenService.setCookie(response, { name: TOKENS.refresh_auth_token, data: refresh_token, age: MAX_AGES[TOKENS.refresh_auth_token] });

    return response.status(HttpStatus.OK).json({
      success: true,
      data: {
        access_token: { value: access_token, type: TOKENS.auth_token, life: Date.now() + MAX_AGES[TOKENS.auth_token] },
        refresh_token
      },
      message: "Logged in successfully."
    });
  }

  @Get('refresh-token')
  refreshToken(@Req() req: RequestWithAll, @Query() refreshTokenDto: RefreshTokenDto, @Res() response: Response) {
    const { id } = req.user;
    const refreshToken = req?.cookies?.[TOKENS.refresh_auth_token];
    const type = refreshTokenDto.type;
    const refreshPayload = this.tokenService.verifyRefreshToken(refreshToken, id);

    let newToken: TOKEN_DATA = {};

    // refresh access token
    if (type === TOKENS.auth_token) {
      newToken.life = Date.now() + MAX_AGES[TOKENS.auth_token]
      newToken.type = TOKENS.auth_token;
      newToken.value = this.tokenService.generateToken(refreshPayload.data);
      this.tokenService.setCookie(response, { data: newToken.value, name: TOKENS.auth_token });
    }


    // just a note : we can also decide to recreate the refresh token in order to keep user session alive
    return response.status(HttpStatus.OK).json({
      success: true,
      data: {
        token: newToken
      }
    })
  }

  @Get('profile')
  async getProfileDetails(@Req() req: RequestWithAll) {
    const data = await this.authService.getProfile(req.user.id);
    return { success: true, data }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
