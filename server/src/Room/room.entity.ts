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
  name: string;

  @Column()
  user_id: number;

  @Column()
  pinCode: number;

  // @BeforeInsert()
  // async addPinCode() {
  //   securePin.generatePin(6, (pin) => {
  //     this.pinCode = pin;
  //   });
  // }

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
