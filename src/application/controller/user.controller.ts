import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Param,
  Put,
  Delete,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/domain/service/user.service';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from 'src/domain/entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('/users')
  async created(@Body() userDto: UserDto): Promise<UserEntity> {
    try {
      return await this._userService.created(userDto);
    } catch (error) {
      throw new HttpException(
        'Something went wrong, call Batman',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserEntity> {
    try {
      return await this._userService.findById(id);
    } catch (error) {
      throw new HttpException(
        'Something went wrong, call Batman',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this._userService.findAll();
    } catch (error) {
      throw new HttpException(
        'Something went wrong, call Batman',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateById(
    @Param('id') id: number,
    @Body() userDto: UserDto,
  ): Promise<UserEntity> {
    try {
      userDto.id = id;
      return await this._userService.updateById(userDto);
    } catch (error) {
      throw new HttpException(
        'Something went wrong, call Batman',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('id')
  @HttpCode(202)
  async deleteById(@Param('id') id: number): Promise<string> {
    try {
      const deletedUser = await this._userService.deleteById(id);

      if (!deletedUser) {
        throw new NotFoundException('User not found');
      }
      return 'User deleted successfully';
    } catch (error) {
      throw new HttpException(
        'Something went wrong, call Batman',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
