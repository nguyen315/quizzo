/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from '../Dto/Room/create-room.dto';
import { User } from 'src/User/user.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>
  ) {}

  async create(createRoomDto: CreateRoomDto, user_id: number) {
    const newRoom = await this.roomRepository.create({
      ...createRoomDto,
      user_id // Get overloaded error here
    });
    this.roomRepository.save(newRoom);
    return newRoom;
  }

  findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  findOne(id: number) {
    return this.roomRepository.findOne(id);
  }
}
