import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Response,
  Res,
  Req
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/Auth/local.auth.guard';
import { JwtAuthGuard } from './Auth/jwt-auth.guard';
import { AppService } from './app.service';
import { UserService } from './User/user.service';
import { AuthService } from './Auth/auth.service';
import { SignUpDto } from './Dto/user.dto';
import { CurrentUser } from './User/user.decorator';
import { ExtractJwt } from 'passport-jwt';
import * as express from 'express';

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
  async login(
    @CurrentUser() user,
    @Res({ passthrough: true }) response: express.Response,
    @Response() res
  ) {
    const token = await this.authService.login(user);
    res.status(200).json({
      success: true,
      accessToken: token.access_token
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/login')
  async loadUser(
    @Request() req,
    @Response() res,
    @Req() request: express.Request
  ) {
    try {
      const user = await this.userService.findOne(req.user.id);
      // extract password before return
      const cookie =
        request.rawHeaders[1].split(' ')[1] ||
        request.headers['authorization'].split(' ')[1];
      const { password, ...result } = user;
      if (cookie === result.accessToken) {
        res.json(result);
      } else {
        res
          .status(400)
          .json({ success: false, message: 'Access token is illegal' });
      }
    } catch (error) {
      res.send(error);
    }
  }

  @Post('api/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    return this.authService.signUp(signUpDto);
  }
}
