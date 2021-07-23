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
      res.json({ success: true, room: createdRoom });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @Get()
  async findAll(
    @Request() req, 
    @Response() res
  ) {
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
  async findOne(
    @Param('id') id: number, 
    @Request() req, 
    @Response() res
  ) {
    try {
      const room = await this.roomService.findOne(+id);
      res.json({ success: true, room: room });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateRoomDto: UpdateRoomDto,
    @Request() req, 
    @Response() res
  ) {
    const user = req.user;
    try {
      const room = await this.roomService.update(+id, updateRoomDto);
      res.json({ success: true, room: room });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number, 
    @Request() req, 
    @Response() res
  ) {
    const user = req.user;
    try {
      const deletedRoom = await this.roomService.deleteOne(+id);
      res.json({ success: true, room: deletedRoom });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
}
