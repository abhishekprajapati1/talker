import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithAll } from 'libs/types';

@Controller('contacts')
@ApiTags("Contacts")
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Post()
  async create(@Body() createContactDto: CreateContactDto, @Req() req: RequestWithAll) {
    const id = req.user.id;
    await this.contactService.create(createContactDto, id);
    return { success: true, message: "Contact created successfully." }
  }

  @Get()
  async findAll(@Req() req: RequestWithAll) {
    const data = await this.contactService.findAll(req.user.id);
    return { success: true, data }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    await this.contactService.update(id, updateContactDto);
    return { success: true, message: "Contact updated successfully." }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.contactService.remove(id);
    return { success: true, message: "Contact deleted successfully." };
  }
}
