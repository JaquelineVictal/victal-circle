import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public birth: Date;

  @ApiProperty()
  public biography: string;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.birth = user.birth;
    this.biography = user.biography;
    this.password = user.password;
    this.createdAt = user.createdAt;
  }
}
