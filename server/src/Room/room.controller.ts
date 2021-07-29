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
  Put,
  Query,
  DefaultValuePipe,
  ParseIntPipe
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/Auth/jwt-auth.guard';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('paginate')
  async PaginativeFindAll(
    @Response() res,
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ) {
    limit = limit > 100 ? 100 : limit;
    try {
      const content = await this.roomService.findAllWithPagination(
        {
          page,
          limit,
          route: '/api/rooms/paginate'
        },
        req.user.id
      );
      res.json({ success: true, ...content });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req, @Response() res) {
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
  async deleteOne(@Param('id') id: number, @Request() req, @Response() res) {
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
