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
import { Answer } from 'src/answer/entities/answer.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer) private answerRepository: Repository<Answer>
  ) {}

  async create(createRoomDto: CreateRoomDto, userId: number) {
    const { questions, ...rest } = createRoomDto;

    const newRoom = {
      ...rest,
      userId: userId,
      pinCode: Math.floor(100000 + Math.random() * 900000)
    };
    const createdRoom = await this.roomRepository.create(newRoom);
    const responseRoom = await this.roomRepository.save(createdRoom);

    await this.roomRepository
      .createQueryBuilder()
      .relation(Room, 'questions')
      .of(responseRoom)
      .add(questions);

    // append questions to response when create room
    const room = await this.roomRepository.findOne(responseRoom.id, {
      relations: ['questions']
    });

    responseRoom.questions = room.questions;
    return responseRoom;
  }

  async findAll(id: number) {
    const response = [];
    let rooms = await this.roomRepository.find({
      userId: id
    });

    return rooms;
  }

  async findAllWithPagination(options: IPaginationOptions, userId: number) {
    const queryBuilder = await this.roomRepository
      .createQueryBuilder('rooms')
      .where('rooms.userId = :userId', { userId });

    const rooms = await paginate<Room>(queryBuilder, options);

    // get questions to each room
    // rooms.items are array of found rooms
    for (let index in rooms.items) {
      const room = await this.roomRepository.findOne(rooms.items[index].id, {
        relations: ['questions']
      });
      rooms.items[index].questions = room.questions;
    }

    return rooms;
  }

  async findAll2() {
    return await this.roomRepository.find();
  }

  async findOne(id: number) {
    return await this.roomRepository.findOne(id);
  }

  async findByPinCode(pinCode: number) {
    const room = await this.roomRepository.findOne(
      { pinCode: pinCode },
      { relations: ['questions'] }
    );
    for (let question of room.questions) {
      const answers = await this.answerRepository.find({
        questionId: question.id
      });
      question.answers = answers;
    }
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    this.roomRepository.update(id, updateRoomDto);
    return this.findOne(id);
  }

  async deleteOne(id: number, userId: number) {
    const foundRoom = await this.roomRepository.find({ id: id });
    if (foundRoom[0].userId === userId) {
      await this.roomRepository.delete(id);
      return true;
    } else {
      return false;
    }
  }
}
