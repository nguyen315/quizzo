import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Question } from 'src/Question/entities/question.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>
  ) {}

  async create(createTagDto: CreateTagDto) {
    const { question_id, ...newTag } = createTagDto;
    const createdTag = await this.tagRepository.create(newTag);
    let foundQuestion = [];
    for (const idx in question_id) {
      foundQuestion[idx] = this.questionRepository.findOne({
        id: question_id[idx]
      });
    }
    createdTag.questions = foundQuestion;
    return await this.tagRepository.save(createdTag);
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findTagByQuestionId(question_id: number) {
    return await this.tagRepository
      .createQueryBuilder('tag')
      .select('tag')
      .where('question_id = :QID', { QID: question_id })
      .getMany();
  }

  async findOne(id: number) {
    return await this.tagRepository.findOne(id);
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    await this.tagRepository.update(id, updateTagDto);
    return await this.findOne(id);
  }

  async updateTagToQuestion(tagId, questionId) {
  }

  async remove(id: number) {
    return await this.tagRepository.delete(id);
  }
}
