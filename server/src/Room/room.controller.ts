/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
  Body,
  Param,
  Delete,
  Put
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { RoomService } from './room.service';
import { CreateRoomDto } from '../Dto/Room/create-room.dto';
import { UpdateRoomDto } from 'src/Dto/Room/update-room.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(
    @Request() req,
    @Response() res,
    @Body() createRoomDto: CreateRoomDto
  ) {
    const user = req.user;
    try {
      const createdRoom = await this.roomService.create(createRoomDto, user.id);
      res.json({ success: true, createdRoom: createdRoom });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @Get()
  async findAll(@Request() req, @Response() res) {
    try {
      const rooms = await this.roomService.findAll();
      res.json({ success: true, rooms: rooms });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roomService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  deleteOne(id: number) {
    return this.roomService.deleteOne(+id);
  }
}
