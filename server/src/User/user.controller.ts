import {
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  Post,
  Body,
  ParseIntPipe,
  Req,
  Res
} from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Omit<User, 'password'>> {
    // Check userId from request token match with userId you want to get info
    const user = await this.userService.findOne(id);
    // extract password before returning
    const { password, ...result } = user;
    return user;
  }

  @Post(':id/update-user')
  updateUser(
    @Param('id') id: number,
    @Body('firstName') firstname: string,
    @Body('lastName') lastname: string,
    @Res() res: Response
  ) {
    this.userService.updateFirstName(id, firstname);
    this.userService.updateLastName(id, lastname);
    res.json({
      success: true
    });
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
}
