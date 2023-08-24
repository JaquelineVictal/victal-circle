import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ServiceModule } from 'src/domain/service/service.module';
import { PostController } from './post/post.controller';

@Module({
  imports: [ServiceModule],
  controllers: [UserController, PostController],
  providers: [],
  exports: [],
})
export class ControllerModule {}
