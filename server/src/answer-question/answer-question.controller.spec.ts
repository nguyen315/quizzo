import { Test, TestingModule } from '@nestjs/testing';
import { AnswerQuestionController } from './answer-question.controller';
import { AnswerQuestionService } from './answer-question.service';

describe('AnswerQuestionController', () => {
  let controller: AnswerQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerQuestionController],
      providers: [AnswerQuestionService]
    }).compile();

    controller = module.get<AnswerQuestionController>(AnswerQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
