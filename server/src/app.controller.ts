import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Response
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/Auth/local.auth.guard';
import { JwtAuthGuard } from './Auth/jwt-auth.guard';
import { AppService } from './app.service';
import { UserService } from './User/user.service';
import { AuthService } from './Auth/auth.service';
import { SignUpDto } from './Dto/user.dto';
import { CurrentUser } from './User/user.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/login')
  async login(@CurrentUser() user, @Response() res) {
    const token = await this.authService.login(user);
    res.status(200).json({
      success: true,
      accessToken: token.access_token
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/login')
  async loadUser(@Request() req, @Response() res) {
    const user = await this.userService.findOne(req.user.id);
    // extract password before return
    const { password, ...result } = user;
    res.send(result);
  }

  @Post('api/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    return this.authService.signUp(signUpDto);
  }
}
