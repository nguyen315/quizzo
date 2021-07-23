import { Test, TestingModule } from '@nestjs/testing';
import { TagQuestionController } from './tag-question.controller';
import { TagQuestionService } from './tag-question.service';

describe('TagQuestionController', () => {
  let controller: TagQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagQuestionController],
      providers: [TagQuestionService]
    }).compile();

    controller = module.get<TagQuestionController>(TagQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
