import { Prisma } from '@prisma/client';
import { PostDto } from 'src/application/dto/post/post.dto';

export class PostModel {
  private _postDto: PostDto;
  constructor(postDto: PostDto) {
    this._postDto = postDto;
  }

  savePostModel(): Prisma.PostCreateInput {
    const savePostModel: Prisma.PostCreateInput = {
      content: this._postDto.content,
      user: { connect: { id: this._postDto.userId } },
    };
    return savePostModel;
  }

  updatePostModel(): {
    data: Prisma.PostUpdateInput;
    filter: Prisma.PostWhereUniqueInput;
  } {
    const updatePostModel: Prisma.PostUpdateInput = {
      content: this._postDto.content,
      user: { connect: { id: this._postDto.userId } },
    };

    const updateFilterPost: Prisma.PostWhereUniqueInput = {
      id: this._postDto.id,
    };
    return { data: updatePostModel, filter: updateFilterPost };
  }
}
