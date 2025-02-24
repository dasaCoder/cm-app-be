import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactsRepository.create(createContactDto);
    return await this.contactsRepository.save(contact);
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactsRepository.find();
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactsRepository.findOneBy({ id });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<Contact> {
    await this.contactsRepository.update(id, updateContactDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.contactsRepository.delete(id);
    return result && result.affected ? result.affected > 0 : false;
  }
} 