import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from 'src/application/dto/user.dto';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async created(createUserDto: UserDto): Promise<UserEntity> {
    try {
      const existingUser = await this.repository.findByEmail(
        createUserDto.email,
      );

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      return await this.repository.created(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  async findById(userId: number): Promise<UserEntity> {
    try {
      return await this.repository.findById(userId);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async updateById(userDto: UserDto): Promise<UserEntity> {
    try {
      const updatedUser = await this.repository.updateById(userDto);

      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(userId: number): Promise<UserEntity> {
    try {
      const deletedUser = await this.repository.deleteById(userId);

      if (!deletedUser) {
        throw new NotFoundException('User not found');
      }

      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
