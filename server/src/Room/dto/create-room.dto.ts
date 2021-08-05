import { IsDefined, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsDefined()
  level: number;

  timeUp?: number;

  questions: any[];
}
