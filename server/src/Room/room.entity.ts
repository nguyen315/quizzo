import { Question } from 'src/Question/entities/question.entity';
import { User } from 'src/User/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  pinCode: number;

  @Column()
  level: number;

  @Column({ default: 15 })
  timeUp: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.room, { eager: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToMany(() => Question, (question) => question.rooms, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  questions: Question[];
}
