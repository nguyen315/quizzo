/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { User } from 'src/User/user.entity';
import { UserService } from 'src/User/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<User |undefined> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password === pass) {
      return user;
    }

    return undefined;
  }
}
