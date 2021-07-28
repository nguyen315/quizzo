import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsDefined, IsNumber, IsString } from 'class-validator';
import { Answer } from '../../answer/entities/answer.entity';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  type: string;

  @IsString()
  @IsDefined()
  image: string | null;

  @IsNumber()
  @IsDefined()
  tagId: number | null;

  answers: any[];
}
