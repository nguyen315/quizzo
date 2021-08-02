import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { User } from 'src/User/user.entity';
import { Question } from 'src/Question/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Question])
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule {}
