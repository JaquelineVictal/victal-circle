import { User } from '@prisma/client';

export class UserEntity {
  public id: number;
  public name: string;
  public email: string;
  public birth: Date;
  public biography: string;
  public password: string;
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
