import { IsDefined, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsDefined()
  name: string;

  timeUp?: number;
}
