import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class PostEntity {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public userId: number;

  @ApiProperty()
  public createdAt: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.content = post.content;
    this.userId = post.userId;
    this.createdAt = post.createdAt;
  }
}
