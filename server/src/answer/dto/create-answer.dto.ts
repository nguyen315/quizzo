import { IsDefined, IsString, IsBoolean } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsDefined()
  content: string;

  @IsBoolean()
  @IsDefined()
  isCorrect: boolean;
}
