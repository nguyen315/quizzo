import { Test, TestingModule } from '@nestjs/testing';
import { AnswerQuestionService } from './answer-question.service';

describe('AnswerQuestionService', () => {
  let service: AnswerQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerQuestionService]
    }).compile();

    service = module.get<AnswerQuestionService>(AnswerQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
