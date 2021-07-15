import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/Auth/local.auth.guard';
import { AppService } from './app.service';
import { AuthService } from './Auth/auth.service';
import { SignUpDto } from './Dto/user.dto';
import { User } from './User/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('api/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<Omit<User, 'password'>> {
    return this.authService.signUp(signUpDto);
  }
}
