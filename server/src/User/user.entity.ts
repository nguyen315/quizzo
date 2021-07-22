import { AnonymousUser } from 'src/AnonymousUsers/anonumousUser.entity';
import { Room } from 'src/Room/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  //@Column()
  //avartar: string;

  @OneToMany((type) => AnonymousUser, (anonumousUser) => anonumousUser.user)
  users: AnonymousUser[];

  @Column({ default: false })
  isAdmin: boolean;

  // @OneToOne (() => Room, (room) => room.user)
  // room: Room;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
