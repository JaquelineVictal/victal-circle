import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/application/dto/user.dto';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async created(createUserDto: UserDto): Promise<UserEntity> {
    return await this.repository.created(createUserDto);
  }

  async findById(userId: number): Promise<UserEntity> {
    return await this.repository.findById(userId);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.findAll();
  }

  async updateById(userDto: UserDto): Promise<UserEntity> {
    return await this.repository.updateById(userDto);
  }

  async deleteById(userId: number): Promise<void> {
    return await this.repository.deleteById(userId);
  }
}
