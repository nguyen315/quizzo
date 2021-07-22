/*
https://docs.nestjs.com/providers#services
*/

import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { User } from 'src/User/user.entity';
import { UserService } from 'src/User/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from 'src/Dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<Omit<User, 'password'>> {
    if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new BadRequestException(
        'Password and Confirmation are not identical.'
      );
    }

    const isEmailTaken = await this.userService.findByEmail(signUpDto.email);
    if (typeof isEmailTaken !== 'undefined') {
      throw new BadRequestException('your Email has been taken!');
    }

    const isUsernameTaken = await this.userService.findByUsername(
      signUpDto.username
    );
    if (typeof isUsernameTaken !== 'undefined') {
      throw new BadRequestException('your Username has been taken!');
    }

    const hashRound = parseInt(process.env.SALTROUNDS) || 10;
    let newUser: User;
    try {
      const hash = await bcrypt.hash(signUpDto.password, hashRound);
      newUser = await this.userService.createUser({
        username: signUpDto.username,
        password: hash,
        email: signUpDto.email
      });

      // extract password before return
      const { password, ...result } = newUser;
      const payload = { username: newUser.username, sub: newUser.id };
      result['accessToken'] = this.jwtService.sign(payload);
      return result;
    } catch (err) {
      // throw what error
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async validateUser(
    username: string,
    pass: string
  ): Promise<Omit<User, 'password'> | undefined> {
    try {
      const user = await this.userService.findByUsername(username);
      const isPasswordMatch = await bcrypt.compare(pass, user.password);
      if (!isPasswordMatch) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST
        );
      }
      // extract password before return
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
