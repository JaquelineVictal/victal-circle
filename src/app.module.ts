import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './application/controller/user.controller';
import { UserService } from './domain/service/user.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserRepository } from './infrastructure/repository/user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, UserRepository],
})
export class AppModule {}
