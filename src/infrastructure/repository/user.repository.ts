import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { IRepository } from './repository.interface';
import { UserDto } from 'src/application/dto/user.dto';

@Injectable()
export class UserRepository implements IRepository {
  constructor(private database: DatabaseService) {}
  created(dto: any) {
    throw new Error('Method not implemented.');
  }

  async create(userDto: UserDto): Promise<User> {
    return this.database.user.create({
      data,
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.database.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findAll(): Promise<User[]> {
    return this.database.user.findMany();
  }

  async updateById(userDto: UserDto): Promise<User> {
    return this.database.user.update({
      data,
      where,
    });
  }

  async deleteById(id: number): Promise<User> {
    return this.database.user.delete({
      where,
    });
  }
}
