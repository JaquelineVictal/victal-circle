import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { RepositoryModule } from 'src/infrastructure/repository/repository.modulo';
import { PostService } from './post/post.service';
@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [UserService, PostService],
  exports: [UserService, PostService],
})
export class ServiceModule {}
