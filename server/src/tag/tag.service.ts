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
    const { ...newTag } = createTagDto;
    const createdTag = await this.tagRepository.create(newTag);
    return await this.tagRepository.save(createdTag);
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findTagByQuestionId(questionId: number) {
    return await this.tagRepository
      .createQueryBuilder('tag')
      .select('tag')
      .where('questionId = :QID', { QID: questionId })
      .getMany();
  }

  async findOne(id: number) {
    return await this.tagRepository.findOne(id);
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    await this.tagRepository.update(id, updateTagDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.tagRepository.delete(id);
  }
}
