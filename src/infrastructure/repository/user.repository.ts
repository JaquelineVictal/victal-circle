import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IRepository } from './repository.interface';
import { UserDto } from 'src/application/dto/user.dto';
import { UserModel } from '../model/user.model';
import { UserEntity } from 'src/domain/entity/user.entity';

@Injectable()
export class UserRepository implements IRepository {
  constructor(private database: DatabaseService) {}

  async created(userDto: UserDto): Promise<UserEntity> {
    const userModel = new UserModel(userDto);
    const newUser = await this.database.user.create({
      data: userModel.saveUserModel(),
    });

    const userEntity = new UserEntity(newUser);
    return userEntity;
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    const userEntity = new UserEntity(user);
    return userEntity;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.database.user.findMany();

    if (!users.length) return [];

    const usersEntity = users.map((user) => new UserEntity(user));
    return usersEntity;
  }

  async updateById(userDto: UserDto): Promise<UserEntity> {
    const userModel = new UserModel(userDto);
    const { data, filter } = userModel.updateUserModel();
    const user = await this.database.user.update({
      data,
      where: filter,
    });

    const userEntity = new UserEntity(user);
    return userEntity;
  }

  async deleteById(id: number): Promise<UserEntity> {
    const user = await this.database.user.delete({
      where: { id },
    });

    const userEntity = new UserEntity(user);
    return userEntity;
  }
}
