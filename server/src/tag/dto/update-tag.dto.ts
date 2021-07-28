import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import { IsDefined, IsString, IsBoolean, IsNumber } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  color: string;

  @IsNumber()
  @IsDefined()
  question_id: number;
}
