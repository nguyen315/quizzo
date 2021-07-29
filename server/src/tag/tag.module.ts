import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Question } from 'src/Question/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    TypeOrmModule.forFeature([Question])
  ],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
