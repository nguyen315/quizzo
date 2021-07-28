import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  async create(createTagDto: CreateTagDto) {
    const createdTag = await this.tagRepository.create(createTagDto);
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

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
