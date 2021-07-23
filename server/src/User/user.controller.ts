import { Request, UseGuards, HttpException, HttpStatus, Delete, Query } from '@nestjs/common';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
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
    // extract password before returning
    const { password, ...result } = user;
    return user;
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

  @Post(':id/change-password')
  async changePassword(
    @Param('id') id: number,
    @Body('password') password: string,
    @Body('oldPassword') oldPassword: string
  ) {
    await this.userService.changePassword(id, password, oldPassword);
    return 'changed password successfully';
  }

  @Post(':id/update-user')
  updateUser(
    @Param('id') id: number,
    @Body('firstName') firstname: string,
    @Body('lastName') lastname: string
  ) {
    this.userService.updateFirstName(id, firstname);
    this.userService.updateLastName(id, lastname);
    return 'updated successfully';
  }
}
