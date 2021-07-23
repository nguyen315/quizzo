import { Test, TestingModule } from '@nestjs/testing';
import { TagQuestionService } from './tag-question.service';

describe('TagQuestionService', () => {
  let service: TagQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagQuestionService]
    }).compile();

    service = module.get<TagQuestionService>(TagQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
