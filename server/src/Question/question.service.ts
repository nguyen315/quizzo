import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination
} from 'nestjs-typeorm-paginate';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>
  ) {}

  async create(createQuestionDto: CreateQuestionDto, userId: string) {
    const { answers, tags, ...createQuestion } = createQuestionDto;
    const newQuestion = {
      ...createQuestion,
      userId: userId
    };
    console.log(tags);

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
    await this.questionRepository
      .createQueryBuilder()
      .relation(Question, 'tags')
      .of(responseQuestion)
      .add(tags);
    return { ...responseQuestion, answers: createdAnswers };
  }

  async findAll(userId: number) {
    const questions = await this.questionRepository.find({
      userId: userId.toString()
    });
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
    const { answers, tags, ...updateQuestion } = updateQuestionDto;
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

    const updatedQuestion = await this.questionRepository.findOne({ id: id });
    const question = await this.questionRepository.findOne(id, {
      relations: ['tags']
    });

    question.tags = [];
    await this.questionRepository.save(question);
    for (const idx in tags) {
      await this.questionRepository
        .createQueryBuilder()
        .relation(Question, 'tags')
        .of(updatedQuestion)
        .add(tags[idx]);
    }
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.answerRepository.delete({ question_id: id });
    return await this.questionRepository.delete(id);
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
}
