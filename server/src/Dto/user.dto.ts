import { IsDefined, IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsDefined()
  username: string;

  @IsString()
  @IsDefined()
  password: string;
}

export class SignUpDto {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  username: string;

  @IsString()
  @IsDefined()
  password: string;

  @IsString()
  @IsDefined()
  confirmPassword: string;
}
