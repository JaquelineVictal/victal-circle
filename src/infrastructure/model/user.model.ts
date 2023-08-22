import { UserDto } from 'src/application/dto/user.dto';
import { Prisma } from '@prisma/client';

export class UserModel {
  private _userDto: UserDto;
  constructor(userDto: UserDto) {
    this._userDto = userDto;
  }

  saveUserModel(): Prisma.UserCreateInput {
    const saveUserModel: Prisma.UserCreateInput = {
      name: this._userDto.name,
      email: this._userDto.email,
      birth: this._userDto.birth,
      biography: this._userDto.biography,
      password: this._userDto.password,
    };
    return saveUserModel;
  }

  updateUserModel(): {
    data: Prisma.UserUpdateInput;
    filter: Prisma.UserWhereUniqueInput;
  } {
    const updateUserModel: Prisma.UserUpdateInput = {
      name: this._userDto.name,
      email: this._userDto.email,
      birth: this._userDto.birth,
      biography: this._userDto.biography,
      password: this._userDto.password,
    };

    const updateFilterUser: Prisma.UserWhereUniqueInput = {
      id: this._userDto.id,
    };
    return { data: updateUserModel, filter: updateFilterUser };
  }
}
