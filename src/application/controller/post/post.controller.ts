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
import { PostDto } from '../../dto/post/post.dto';
import { PostEntity } from 'src/domain/entity/post/post.entity';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostService } from 'src/domain/service/post/post.service';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly _postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: () => PostEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async created(@Body() postDto: PostDto): Promise<PostEntity> {
    try {
      return await this._postService.created(postDto);
    } catch (error) {
      this._throwInternalServerError(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({
    status: 200,
    description: 'The post was found.',
    type: () => PostEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  async findById(@Param('id') id: number): Promise<PostEntity> {
    try {
      return await this._postService.findById(Number(id));
    } catch (error) {
      if (error instanceof NotFoundException) {
        this._throwNotFoundError(error);
      }
      this._throwInternalServerError(error);
    }
  }

  @Get()
  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'List of posts.',
    type: () => [PostEntity],
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(): Promise<PostEntity[]> {
    try {
      return await this._postService.findAll();
    } catch (error) {
      this._throwInternalServerError(error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({
    status: 200,
    description: 'The post was updated.',
    type: () => PostEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  async updateById(
    @Param('id') id: number,
    @Body() postDto: PostDto,
  ): Promise<PostEntity> {
    try {
      postDto.id = Number(id);

      return await this._postService.updateById(postDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this._throwNotFoundError(error);
      }
      this._throwInternalServerError(error);
    }
  }

  @Delete(':id')
  @HttpCode(202)
  @ApiOperation({ summary: 'Delete post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({
    status: 202,
    description: 'Post deleted successfully.',
    type: () => 'Post deleted successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  async deleteById(@Param('id') id: number): Promise<string> {
    try {
      await this._postService.deleteById(Number(id));

      return 'Post deleted successfully';
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
}
