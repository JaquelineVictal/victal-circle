import { Injectable, NotFoundException } from '@nestjs/common';
import { PostDto } from 'src/application/dto/post/post.dto';
import { PostRepository } from 'src/infrastructure/repository/post/post.repository';
import { PostEntity } from '../../entity/post/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly repository: PostRepository) {}

  async created(createPostDto: PostDto): Promise<PostEntity> {
    try {
      return await this.repository.created(createPostDto);
    } catch (error) {
      throw error;
    }
  }

  async findById(postId: number): Promise<PostEntity> {
    try {
      const findPost = await this._findPostById(postId);
      return findPost;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<PostEntity[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async updateById(postDto: PostDto): Promise<PostEntity> {
    try {
      await this._findPostById(postDto.id);
      return await this.repository.updateById(postDto);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(postId: number): Promise<PostEntity> {
    try {
      await this._findPostById(postId);

      return await this.repository.deleteById(postId);
    } catch (error) {
      throw error;
    }
  }

  private async _findPostById(postId: number): Promise<PostEntity> {
    const findPost = await this.repository.findById(postId);

    if (!findPost) {
      throw new NotFoundException('Post not found');
    }
    return findPost;
  }
}
