import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { IRepository } from '../repository.interface';
import { PostDto } from 'src/application/dto/post/post.dto';
import { PostModel } from '../../model/post/post.model';
import { PostEntity } from 'src/domain/entity/post/post.entity';

@Injectable()
export class PostRepository implements IRepository {
  constructor(private database: DatabaseService) {}

  async created(postDto: PostDto): Promise<PostEntity> {
    const postModel = new PostModel(postDto);

    const newPost = await this.database.post.create({
      data: postModel.savePostModel(),
    });

    const postEntity = new PostEntity(newPost);
    return postEntity;
  }

  async findById(id: number): Promise<PostEntity | null> {
    const post = await this.database.post.findUnique({
      where: { id },
    });

    if (!post) return null;

    const postEntity = new PostEntity(post);
    return postEntity;
  }

  async findAll(): Promise<PostEntity[]> {
    const posts = await this.database.post.findMany();

    if (!posts.length) return [];

    const postsEntity = posts.map((post) => new PostEntity(post));
    return postsEntity;
  }

  async updateById(postDto: PostDto): Promise<PostEntity> {
    const postModel = new PostModel(postDto);
    const { data, filter } = postModel.updatePostModel();
    const post = await this.database.post.update({
      data,
      where: filter,
    });

    const postEntity = new PostEntity(post);
    return postEntity;
  }

  async deleteById(id: number): Promise<PostEntity> {
    const post = await this.database.post.delete({
      where: { id },
    });
    const postEntity = new PostEntity(post);
    return postEntity;
  }
}
