import { AnonymousUser } from 'src/AnonymousUsers/anonumousUser.entity';
import { Room } from 'src/Room/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @Column({ default: false })
  isActivated: boolean;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  avartar: string;

  @Column({ default: '', length: 500 })
  accessToken: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: null })
  token: string;

  @OneToMany(() => Room, (room) => room.user)
  room: Room[];

  @OneToMany((type) => AnonymousUser, (anonumousUser) => anonumousUser.user)
  users: AnonymousUser[];
}
