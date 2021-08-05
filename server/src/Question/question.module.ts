import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([Tag])
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule {}
