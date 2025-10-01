import { OptionsService } from './options.service';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [QuestionsController],
  providers: [QuestionsService, OptionsService],
})
export class QuestionsModule {}
