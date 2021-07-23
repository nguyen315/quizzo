import { PartialType } from '@nestjs/mapped-types';
import { CreateTagQuestionDto } from './create-tag-question.dto';

export class UpdateTagQuestionDto extends PartialType(CreateTagQuestionDto) {}
