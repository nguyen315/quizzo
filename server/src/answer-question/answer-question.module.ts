import { Module } from '@nestjs/common';
import { AnswerQuestionService } from './answer-question.service';
import { AnswerQuestionController } from './answer-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerQuestion } from './entities/answer-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerQuestion])],
  controllers: [AnswerQuestionController],
  providers: [AnswerQuestionService]
})
export class AnswerQuestionModule {}
