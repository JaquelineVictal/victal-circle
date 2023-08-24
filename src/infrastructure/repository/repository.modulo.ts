import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './user/user.repository';
import { PostRepository } from './post/post.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [UserRepository, PostRepository],
  exports: [UserRepository, PostRepository],
})
export class RepositoryModule {}
