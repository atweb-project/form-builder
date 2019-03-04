import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { formsProviders } from './forms.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FormsController],
  providers: [FormsService, ...formsProviders],
})
export class FormsModule {}
