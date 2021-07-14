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
  Response,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { LocalAuthGuard } from 'src/Auth/local.auth.guard';
import { SignUpDto, UserLoginDto } from 'src/Dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(
    @Body() loginDto: UserLoginDto,
    @Request() req,
  ): Promise<User> {
    return req.user;
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

  @Post('sign-up')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.userService.signUp(signUpDto);
  }
}
