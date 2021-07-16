/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Delete,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Response
} from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { LocalAuthGuard } from 'src/Auth/local.auth.guard';
import { UserLoginDto } from 'src/Dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginDto: UserLoginDto, @Request() req, @Response() res): Promise<User|undefined> {
    return res.json(req.user);
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Post()
  addUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Post(':id/update-password')
  updatePassword(@Param('id') id: number, @Body('password') password: string) {
    return this.userService.updatePassword(id, password)
  }

  @Post(':id/update-username')
  updateUsername(@Param('id') id: number, @Body('username') username: string) {
    return this.userService.updateUsername(id, username)
  }

  @Post(':id/update-email')
  updateEmail(@Param('id') id: number, @Body('email') email: string) {
    return this.userService.updateEmail(id, email)
  }
  
}

