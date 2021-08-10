import {
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  Delete,
  Query,
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Res,
  Put,
  UseInterceptors,
  UploadedFile,
  Response
} from '@nestjs/common';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';
import path = require('path');
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const imageID = uuidv4();

const storage = {
  storage: diskStorage({
    destination: './uploads/avartar',
    filename: (req, file, cb) => {
      const filename: string =
        imageID + path.parse(file.originalname).name.replace(/\s/g, '');
      const extention: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extention}`);
    }
  })
};

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(@Request() req, @Response() res) {
    const user = req.user;
    if (user.isAdmin)
      return res.json({ success: true, users: this.userService.findAll() });
    return res
      .status(400)
      .json({ success: false, message: 'Just admin can access' });
  }

  @Get('logout')
  async logout(@Request() req, @Response() res) {
    try {
      console.log(req.user);
      await this.userService.logout(req.user);
      res.json({ success: true, message: 'logout successfully' });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Omit<User, 'password'>> {
    // Check userId from request token match with userId you want to get info
    const user = await this.userService.findOne(id);
    // extract password before returning
    const { password, ...result } = user;
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(id);
  }

  @Put(':id/update-user')
  async updateUser(
    @Param('id') id: number,
    @Body('firstName') firstname: string,
    @Body('lastName') lastname: string,
    @Body('avartar') avartar: string,
    @Response() res
  ) {
    try {
      const updatedUser = await this.userService.updateProfile(
        id,
        firstname,
        lastname,
        imageID + avartar
      );
      res.json({
        success: true,
        user: updatedUser
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
  @Post()
  addUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get('activate/confirm?')
  async activateUser(@Query('token') token: string): Promise<any> {
    return await this.userService.setActive(token);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('avartar', storage))
  uploadFile(@UploadedFile() file) {
    return { imagePath: file.filename };
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
