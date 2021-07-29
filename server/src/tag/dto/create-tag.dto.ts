import { IsDefined, IsString, IsBoolean } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  color: string;
}
