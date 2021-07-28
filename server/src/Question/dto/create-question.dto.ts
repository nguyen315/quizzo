import { IsDefined, IsNumber, IsString } from 'class-validator';
import { Answer } from '../../answer/entities/answer.entity';

export class CreateQuestionDto {
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
