import { Tag } from 'src/tag/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable
} from 'typeorm';
import { Answer } from '../../answer/entities/answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

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

  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: true
  })
  answers: Answer[];

  @ManyToMany(() => Tag, (tag) => tag.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  tags: Tag[];
}
