import { Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getOne(
    @Param('id') id: number,): Promise<Omit<User,'salt' | 'password'>> {
    const user = await this.userService.findOne(id);
    // extract password and salt before returning
    const { password, salt, ...result } = user;
    return result;
  }

  @Post()
  addUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Post(':id/change-password')
  async changePassword(@Param('id') id: number, @Body('password') password: string) {
    this.userService.changePassword(id, password)
    return "changed password successfully"
  }

  @Post(':id/update-user')
  updateUser(@Param('id') id: number, 
             @Body('firstName') firstname: string,
             @Body('lastName') lastname: string) {
    this.userService.updateFirstName(id, firstname)
    this.userService.updateLastName(id, lastname)
    return "updated successfully"
  }
}

