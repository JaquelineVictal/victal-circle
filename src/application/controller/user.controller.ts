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
  ConflictException,
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
      if (error instanceof ConflictException) {
        this._throwBadRequestError(error);
      }
      this._throwInternalServerError();
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserEntity> {
    try {
      return await this._userService.findById(id);
    } catch (error) {
      this._throwInternalServerError();
    }
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this._userService.findAll();
    } catch (error) {
      this._throwInternalServerError();
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
      if (error instanceof NotFoundException) {
        this._throwNotFoundError(error);
      }
      this._throwInternalServerError();
    }
  }

  @Delete('id')
  @HttpCode(202)
  async deleteById(@Param('id') id: number): Promise<string> {
    try {
      await this._userService.deleteById(id);

      return 'User deleted successfully';
    } catch (error) {
      if (error instanceof NotFoundException) {
        this._throwNotFoundError(error);
      }

      this._throwInternalServerError();
    }
  }

  private _throwInternalServerError(): void {
    throw new HttpException(
      'Something went wrong, call Batman',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private _throwNotFoundError(error): void {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  }

  private _throwBadRequestError(error): void {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}
