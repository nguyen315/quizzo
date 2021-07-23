import {
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
  Put
} from '@nestjs/common';
import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
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
  async getOne(@Param('id') id: number): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOne(id);

    // extract password before return
    const { password, ...result } = user;
    return result;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(id);
  }

  @Post()
  addUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get('activate/confirm?')
  async activateUser(@Query('token') token: string): Promise<any> {
    return await this.userService.setActive(token);
  }
}
