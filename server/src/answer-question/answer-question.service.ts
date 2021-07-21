import { Injectable } from '@nestjs/common';
import { CreateAnswerQuestionDto } from './dto/create-answer-question.dto';
import { UpdateAnswerQuestionDto } from './dto/update-answer-question.dto';

@Injectable()
export class AnswerQuestionService {
  create(createAnswerQuestionDto: CreateAnswerQuestionDto) {
    return 'This action adds a new answerQuestion';
  }

  findAll() {
    return `This action returns all answerQuestion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answerQuestion`;
  }

  update(id: number, updateAnswerQuestionDto: UpdateAnswerQuestionDto) {
    return `This action updates a #${id} answerQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} answerQuestion`;
  }
}
