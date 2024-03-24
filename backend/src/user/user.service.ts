import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

interface IUpdateStatus { id: string, status: "online" | "offline" }
@Injectable()
export class UserService {


  constructor(
    private readonly prisma: PrismaService
  ) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  // used for checking necessary details available in public domain
  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true } });
  }

  async updateStatus({ id, status }: IUpdateStatus) {
    return await this.prisma.userStatus.upsert({
      where: { user_id: id },
      create: {
        type: status,
        user: { connect: { id } }
      },
      update: {
        type: status
      },
      select: {
        type: true,
        user_id: true,
        updated_at: true,
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findAllByNameOrEmail(input: string) {
    return await this.prisma.user.findMany({
      where: {
        name: { contains: input }
      },
      select: { email: true, name: true, id: true }
    })
  }
}
