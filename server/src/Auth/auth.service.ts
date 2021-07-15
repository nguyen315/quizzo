/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { User } from 'src/User/user.entity';
import { UserService } from 'src/User/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password === pass) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
