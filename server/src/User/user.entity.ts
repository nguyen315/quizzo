import { AnonymousUser } from 'src/AnonymousUsers/anonumousUser.entity';
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

  //@Column()
  //avartar: string;

  @OneToMany((type) => AnonymousUser, (anonumousUser) => anonumousUser.user)
  users: AnonymousUser[];

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({default: null})
  token: string;
}


