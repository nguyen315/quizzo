import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Question } from 'src/Question/entities/question.entity';

@Entity()
export class AnswerQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Question, (questionId) => questionId.id)
  question: Question;

  @Column()
  title: string;

  @Column()
  isChoice: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
