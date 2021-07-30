/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { User } from 'src/User/user.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination
} from 'nestjs-typeorm-paginate';
import { Question } from 'src/Question/entities/question.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Question) private questionRepository: Repository<Question>
  ) {}

  async create(createRoomDto: CreateRoomDto, user_id: number) {
    const { questions, ...rest } = createRoomDto;

    const newRoom = {
      ...rest,
      user_id: user_id,
      pinCode: Math.floor(100000 + Math.random() * 900000)
    };
    const createdRoom = await this.roomRepository.create(newRoom);
    const responseRoom = await this.roomRepository.save(createdRoom);
    
    await this.roomRepository
      .createQueryBuilder()
      .relation(Room, 'questions')
      .of(responseRoom)
      .add(questions);
    return responseRoom;
  }

  async findAll() {
    const users = await this.userRepository.find();
    const response = [];
    for (const user of users) {
      let user_id = user.id;
      let rooms = await this.roomRepository.find({
        user_id: user_id
      });
      let { password, ...responseUser } = user;
      response.push({ ...responseUser, rooms: rooms });
    }
    return response;
  }

  async findAllWithPagination(
    options: IPaginationOptions,
    userId: number
  ): Promise<Pagination<Room>> {
    const queryBuilder = await this.roomRepository
      .createQueryBuilder('rooms')
      .where('rooms.user_id = :userId', { userId });

    return paginate<Room>(queryBuilder, options);
  }

  async findOne(id: number) {
    return this.roomRepository.findOne(id);
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    this.roomRepository.update(id, updateRoomDto);
    return this.findOne(id);
  }

  async deleteOne(id: number) {
    return this.roomRepository.delete(id);
  }
}
