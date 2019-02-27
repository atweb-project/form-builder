import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { Database } from './database';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, Database],
})
export class AppModule {}
