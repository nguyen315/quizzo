import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private questionRepository: Repository<Question>
  ) {}

  async create(createQuestionDto: CreateQuestionDto, userId: string) {
    const createdQuestion = this.questionRepository.create({
      ...createQuestionDto,
      userId: userId
    });
    await this.questionRepository.save(createdQuestion);
    return createdQuestion;
  }

  findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  findOne(id: number) {
    return this.questionRepository.findOne(id);
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    this.questionRepository.update(id, updateQuestionDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.questionRepository.delete(id);
  }
}
