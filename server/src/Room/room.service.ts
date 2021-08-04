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

  async findAll(id: number) {
    const response = [];
    let rooms = await this.roomRepository.find({
      user_id: id
    });

    return rooms;
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
        question_id: question.id
      });
      question.answers = answers;
    }
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    this.roomRepository.update(id, updateRoomDto);
    return this.findOne(id);
  }

  async deleteOne(id: number) {
    return this.roomRepository.delete(id);
  }
}
