import { Request, UseGuards, HttpException, HttpStatus, Req } from '@nestjs/common';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

import { CurrentUser } from './user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getOne(@Request() req, @Param('id') id: number): Promise<Omit<User, 'password'>> {
    console.log(req.user);
    const user = await this.userService.findOne(id);
    // extract password before returning
    const { password, ...result } = user;
    return user;
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
  @Post()
  addUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
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

  @Post('test')
  async findOne(@Request() req, @CurrentUser() user) {
    console.log(user);
}
}
