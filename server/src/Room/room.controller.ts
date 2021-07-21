/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Param
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { RoomService } from './room.service';
import { CreateRoomDto } from '../Dto/Room/create-room.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    const user = req.user;
    return this.roomService.create(createRoomDto, user.id);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roomService.findOne(id);
  }
}
