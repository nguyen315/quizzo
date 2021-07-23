import { Injectable } from '@nestjs/common';
import { CreateTagQuestionDto } from './dto/create-tag-question.dto';
import { UpdateTagQuestionDto } from './dto/update-tag-question.dto';

@Injectable()
export class TagQuestionService {
  create(createTagQuestionDto: CreateTagQuestionDto) {
    return 'This action adds a new tagQuestion';
  }

  findAll() {
    return `This action returns all tagQuestion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tagQuestion`;
  }

  update(id: number, updateTagQuestionDto: UpdateTagQuestionDto) {
    return `This action updates a #${id} tagQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} tagQuestion`;
  }
}
