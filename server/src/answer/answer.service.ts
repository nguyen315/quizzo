import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>
  ) {}

  async create(createAnswerDto: CreateAnswerDto, question_id: number) {
    const newAnswer = { ...createAnswerDto, question_id };

    const createdAnswer = this.answerRepository.create(newAnswer);
    return await this.answerRepository.save(createdAnswer);
  }

  async findAll() {
    return await this.answerRepository.find();
  }

  async findByQuestion(question_id: number) {
    return await this.answerRepository.find({ question_id: question_id });
  }

  async findOne(id: number) {
    return await this.answerRepository.findOne(id);
  }

  async update(
    id: number,
    updateAnswerDto: UpdateAnswerDto,
    question_id: number
  ) {
    const updateAnswer = { ...updateAnswerDto, question_id };
    await this.answerRepository.update(id, updateAnswer);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.answerRepository.delete(id);
  }
}
