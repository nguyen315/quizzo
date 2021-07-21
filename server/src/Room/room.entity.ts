import { User } from 'src/User/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import * as securePin from 'secure-pin';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
  user: User;

  @Column()
  name: string;

  @Column()
  pinCode: string;

  @BeforeInsert()
  async addPinCode() {
    securePin.generatePin(6, (pin) => {
      this.pinCode = pin;
    });
  }

  @Column({ default: 15 })
  timeUp: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
