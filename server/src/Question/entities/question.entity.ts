import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { AnswerQuestion } from '../../answer-question/entities/answer-question.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  //   @Column()
  //   playerChoiceId: string;

  // @OneToMany(() => AnswerQuestion, (answer) => answer.question)
  // answers: AnswerQuestion[];

  @Column({
    default: ''
  })
  tagId: string;

  @Column()
  title: string;

  @Column({
    default: ''
  })
  image: string;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
