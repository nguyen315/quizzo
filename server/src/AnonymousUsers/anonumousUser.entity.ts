import { User } from 'src/User/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class AnonymousUser {
  @PrimaryGeneratedColumn()
  anonymousId: number;

  @Column()
  name: string;
  // @ManyToOne(type => User, user=>user.users)
  // @JoinColumn({name: 'user_id'})
  // name: User;

  @ManyToOne((type) => User, (user) => user.users)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column()
  roomId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
