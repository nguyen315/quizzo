import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer) private answerRepository: Repository<Answer>
  ) {}

  async create(createQuestionDto: CreateQuestionDto, userId: string) {
    const newQuestion = {
      ...createQuestionDto,
      userId: userId
    };

    const createdQuestion = this.questionRepository.create(newQuestion);
    return await this.questionRepository.save(createdQuestion);
  }

  async findAll() {
    const questions = await this.questionRepository.find();
    const responseData = [];
    let question_id = null;
    let answers = null;
    for (const idx in questions) {
      question_id = questions[idx].id;
      answers = await this.answerRepository.find({
        question_id: question_id
      });
      responseData[idx] = { ...questions[idx], answers: answers };
    }
    return responseData;
  }

  async findOne(id: number) {
    const answers = await this.answerRepository.find({ question_id: id });
    const question = await this.questionRepository.findOne(id);
    return { ...question, answers };
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    await this.questionRepository.update(id, updateQuestionDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.questionRepository.delete(id);
  }
}
