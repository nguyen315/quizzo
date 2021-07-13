/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Delete,  Post } from '@nestjs/common';
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void>{
      return this.userService.remove(id);
  }

  @Post()
  addUser(@Body() user: User): Promise<User>{
      return this.userService.createUser(user);
  }
}
