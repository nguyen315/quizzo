import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-answer.dto';
import { IsDefined, IsString, IsBoolean } from 'class-validator';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
  @IsString()
  @IsDefined()
  content: string;

  @IsBoolean()
  @IsDefined()
  isCorrect: boolean;
}
