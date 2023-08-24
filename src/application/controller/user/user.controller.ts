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
import { UserDto } from '../../dto/user/user.dto';
import { UserEntity } from 'src/domain/entity/user/user.entity';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: () => UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async created(@Body() userDto: UserDto): Promise<UserEntity> {
    try {
      return await this._userService.created(userDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        this._throwBadRequestError(error);
      }
      this._throwInternalServerError(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'The user was found.',
    type: () => UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findById(@Param('id') id: number): Promise<UserEntity> {
    try {
      return await this._userService.findById(Number(id));
    } catch (error) {
      if (error instanceof NotFoundException) {
        this._throwNotFoundError(error);
      }
      this._throwInternalServerError(error);
    }
  }

  @Get()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users.',
    type: () => [UserEntity],
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this._userService.findAll();
    } catch (error) {
      this._throwInternalServerError(error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'The user was updated.',
    type: () => UserEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async updateById(
    @Param('id') id: number,
    @Body() userDto: UserDto,
  ): Promise<UserEntity> {
    try {
      userDto.id = Number(id);

      return await this._userService.updateById(userDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this._throwNotFoundError(error);
      }
      this._throwInternalServerError(error);
    }
  }

  @Delete(':id')
  @HttpCode(202)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 202,
    description: 'User deleted successfully.',
    type: () => 'User deleted successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteById(@Param('id') id: number): Promise<string> {
    try {
      await this._userService.deleteById(Number(id));

      return 'User deleted successfully';
    } catch (error) {
      if (error instanceof NotFoundException) {
        this._throwNotFoundError(error);
      }

      this._throwInternalServerError(error);
    }
  }

  private _throwInternalServerError(error?): void {
    throw new HttpException(
      error?.message ?? 'Something went wrong, call Batman',
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
