import { Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

// @UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getOne(
    @Param('id') id: number,): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOne(id);
    // extract password before return
    const { password, ...result } = user;
    return result;
  }

  @Post()
  addUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Post(':id/update-user')
  async updateUser(@Param('id') id: number, 
             @Body('username') username: string,
             @Body('firstname') firstname: string,
             @Body('lastname') lastname: string) {
    await this.userService.updateUsername(id, username)
    this.userService.updateFirstName(id, firstname)
    this.userService.updateLastName(id, lastname)
    return "updated successfully"
  }
}

