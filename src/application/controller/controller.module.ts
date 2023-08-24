import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ServiceModule } from 'src/domain/service/service.module';

@Module({
  imports: [ServiceModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class ControllerModule {}
