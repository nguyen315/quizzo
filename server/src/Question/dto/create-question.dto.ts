import { IsDefined, IsNumber, IsObject, IsString } from 'class-validator';
import { Answer } from '../../answer/entities/answer.entity';

export class CreateQuestionDto {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  type: string;

  image: string | null;

  @IsDefined()
  answers: Answer[];

  tags: any[];
}
