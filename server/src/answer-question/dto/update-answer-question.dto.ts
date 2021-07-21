import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerQuestionDto } from './create-answer-question.dto';

export class UpdateAnswerQuestionDto extends PartialType(
  CreateAnswerQuestionDto
) {}
