import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createContactDto: CreateContactDto, user_id: string) {
    await this.prisma.contact.create({
      data: {
        ...createContactDto,
        user: { connect: { id: user_id } }
      }
    })
  }

  async findAll(user_id: string) {
    return await this.prisma.contact.findMany({ where: { user_id }, select: { email: true, name: true, id: true } });
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    await this.prisma.contact.update({
      where: { id },
      data: updateContactDto
    })
  }

  async remove(id: string) {
    await this.prisma.contact.delete({ where: { id } });
  }
}
