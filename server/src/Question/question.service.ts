import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination
} from 'nestjs-typeorm-paginate';
import { query } from 'express';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer) private answerRepository: Repository<Answer>
  ) {}

  async create(createQuestionDto: CreateQuestionDto, userId: string) {
    const { answers, ...createQuestion } = createQuestionDto;
    const newQuestion = {
      ...createQuestion,
      userId: userId
    };

    const createdQuestion = this.questionRepository.create(newQuestion);
    const responseQuestion = await this.questionRepository.save(
      createdQuestion
    );
    let createdAnswers = [];
    let createdAnswer = null;
    let newAnswer = null;

    for (const idx in answers) {
      newAnswer = { ...answers[idx], question_id: responseQuestion.id };
      createdAnswer = await this.answerRepository.create(newAnswer);
      createdAnswers[idx] = await this.answerRepository.save(createdAnswer);
    }
    return { ...responseQuestion, createdAnswers };
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

  async findAllWithPagination(options: IPaginationOptions, userID: string) {
    const UserId = Number(userID);
    const queryBuilderForTotal = await this.questionRepository
      .createQueryBuilder('questions')
      .leftJoinAndSelect('questions.answers', 'answers')
      .where('questions.userId = :UserId', { UserId })
      .getMany();
    const total = queryBuilderForTotal.length;
    const queryBuilder = await this.questionRepository
      .createQueryBuilder('questions')
      .leftJoinAndSelect('questions.answers', 'answers')
      .where('questions.userId = :UserId', { UserId })
      .skip(Number(options.limit) * (Number(options.page) - 1))
      .take(Number(options.limit))
      .getMany();
      
    return { ...queryBuilder, total };
  }

  async findOne(id: number) {
    const answers = await this.answerRepository.find({ question_id: id });
    const question = await this.questionRepository.findOne(id);
    return { ...question, answers };
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const { answers, ...updateQuestion } = updateQuestionDto;
    await this.questionRepository.update(id, updateQuestion);
    let updatedAnswer = null;
    let newUpdateAnswer = null;
    let idAnswer = null;
    const foundQuestion = await this.findOne(id);

    for (const idx in answers) {
      idAnswer = foundQuestion.answers[idx].id;
      newUpdateAnswer = { ...answers[idx], question_id: id };
      updatedAnswer = await this.answerRepository.update(
        idAnswer,
        newUpdateAnswer
      );
    }
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.answerRepository.delete({ question_id: id });
    return await this.questionRepository.delete(id);
  }
}
