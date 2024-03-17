import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UtilityService } from '../utility/utility.service';
import { LoginDto } from './dto/login.dto';
import { TokenService } from 'src/token/token.service';
import { TOKENS, TOKEN_EXPIRATIONS } from 'libs/constants';

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly utilities: UtilityService,
    private readonly tokens: TokenService,
  ) { }

  async doesUserExist(email: string) {
    return await this.prisma.user.findUnique({ where: { email }, select: { id: true } })
  }

  async create(createAuthDto: CreateAuthDto) {
    await this.prisma.user.create({
      data: {
        email: createAuthDto.email,
        name: createAuthDto.name,
        password: this.utilities.hashString(createAuthDto.password)
      }
    })
  }

  async userLogin(loginDto: LoginDto) {
    // get user
    const user = await this.prisma.user.findUnique({ where: { email: loginDto.email }, select: { id: true, password: true } })
    if (!user) throw new BadRequestException({ success: false, message: "Invalid credentials." })

    // check password
    if (!this.utilities.compareString(loginDto.password, user.password)) throw new BadRequestException({ success: false, message: "Invalid credentials." });

    return user;
  }

  async getProfile(user_id: string) {
    return await this.prisma.user.findUnique({
      where: { id: user_id },
      select: { id: true, name: true, email: true }
    })
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
