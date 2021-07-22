import { Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
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
    if (req.user.id != id) {
      throw new HttpException(
        'FORBIDDEN You do not have right to access this resource',
        HttpStatus.FORBIDDEN
      );
    }
    const user = await this.userService.findOne(id);

    // extract password before return
    const { password, ...result } = user;
    return result;
  }

  // @Delete(':id')
  // deleteUser(@Param('id') id: string): Promise<void> {
  //   return this.userService.remove(id);
  // }

  // @Post()
  // addUser(@Body() user: User): Promise<User> {
  //   return this.userService.createUser(user);
  // }
}
