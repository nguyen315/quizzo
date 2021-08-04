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
import { query } from 'express';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>
  ) {}

  unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  async create(createQuestionDto: CreateQuestionDto, userId: string) {
    const { answers, tags, ...createQuestion } = createQuestionDto;
    const newQuestion = {
      ...createQuestion,
      userId: userId
    };

    const tagsUnique = tags.filter(this.unique);

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

    let tagIds = [];
    let foundTags = [];
    for (const idx in tagsUnique) {
      foundTags[idx] = await this.tagRepository.find({
        title: tagsUnique[idx]
      });
      if (!foundTags[idx][0]) {
        let newTag = await this.tagRepository.create({
          title: tagsUnique[idx],
          color: 'blue'
        });
        let resTag = await this.tagRepository.save(newTag);
        foundTags[idx] = await this.tagRepository.find({ title: resTag.title });
      }
    }
    if (foundTags[0].length > 0) {
      for (const idx in foundTags) {
        tagIds[idx] = foundTags[idx][0].id;
      }
    }
    if (tagIds.length > 0) {
      await this.questionRepository
        .createQueryBuilder()
        .relation(Question, 'tags')
        .of(responseQuestion)
        .add(tagIds);
    }
    const createdQuestionResspone = await this.questionRepository.findOne(
      responseQuestion.id,
      { relations: ['tags'] }
    );
    return { ...createdQuestionResspone, answers: createdAnswers };
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
    let question = null;
    let resDta = [];
    for (const idx in queryBuilder) {
      const foundAnswer = queryBuilder[idx].answers;
      question = await this.questionRepository.findOne(queryBuilder[idx].id, {
        relations: ['tags']
      });
      resDta[idx] = { ...question, answers: foundAnswer };
    }

    return { ...resDta, total };
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
}
