import { isDefined, IsDefined, IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsString()
  @IsDefined()
  name: string;

  timeUp?: number;
}
