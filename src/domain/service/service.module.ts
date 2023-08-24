import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RepositoryModule } from 'src/infrastructure/repository/repository.modulo';
@Module({
  imports: [RepositoryModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class ServiceModule {}
