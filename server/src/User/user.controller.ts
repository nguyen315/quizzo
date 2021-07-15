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
} from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { LocalAuthGuard } from 'src/Auth/local.auth.guard';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { HttpException, BadRequestException } from '@nestjs/common';
import { SignUpDto, UserLoginDto } from 'src/Dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from '../Auth/auth.service';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: UserLoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Request() req, @Param('id') id: number): Promise<User> {
    console.log(req.user);
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
