import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  })) createContactDto: CreateContactDto) {
    try {
      return await this.contactsService.create(createContactDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException('Failed to create contact', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.contactsService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch contacts', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const contact = await this.contactsService.findOne(id);
      if (!contact) {
        throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
      }
      return contact;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException('Failed to fetch contact', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })) updateContactDto: CreateContactDto
  ) {
    try {
      const contact = await this.contactsService.update(id, updateContactDto);
      if (!contact) {
        throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
      }
      return contact;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      if (error.code === '23505') {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException('Failed to update contact', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.contactsService.remove(id);
      if (!result) {
        throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Contact deleted successfully' };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException('Failed to delete contact', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 