import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ControllerModule } from './application/controller/controller.module';

@Module({
  imports: [DatabaseModule, ControllerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
