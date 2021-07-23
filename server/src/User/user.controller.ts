import { Request, UseGuards, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // getAll(): Promise<User[]> {
  //   return this.userService.findAll();
  // }
  @Get(':id')
  async getOne(
    @Request() req,
    @Param('id') id: number
  ): Promise<Omit<User, 'password'>> {
    // Check userId from request token match with userId you want to get info
    const user = await this.userService.findOne(id);

    // extract password before return
    const { password, ...result } = user;
    return result;
  }

  @Post('activate/:id')
  async activateUser(@Param('id') id:number): Promise<User>{
    return await this.userService.setActive(id);
  }

}
