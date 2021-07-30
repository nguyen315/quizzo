import { User } from 'src/User/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import * as securePin from 'secure-pin';


@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column()
  pinCode: number;

  @Column()
  level: string;

  @Column({ default: 15 })
  timeUp: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.room, { eager: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
