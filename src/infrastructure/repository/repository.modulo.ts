import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoryModule {}
