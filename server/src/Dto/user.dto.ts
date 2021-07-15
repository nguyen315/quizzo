import { IsDefined, IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsDefined()
  username: string;

  @IsString()
  @IsDefined()
  password: string;
}

