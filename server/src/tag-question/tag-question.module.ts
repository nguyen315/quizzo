import { Module } from '@nestjs/common';
import { TagQuestionService } from './tag-question.service';
import { TagQuestionController } from './tag-question.controller';

@Module({
  controllers: [TagQuestionController],
  providers: [TagQuestionService]
})
export class TagQuestionModule {}
