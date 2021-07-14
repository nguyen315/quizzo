/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/Dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  createUser(@Body() user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  findByUsername(userName: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username: userName });
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new BadRequestException(
        'Password and Confirmation are not identical.',
      );
    }


    const isEmailTaken= await this.userRepository.findOne({ email: signUpDto.email });
    if (typeof isEmailTaken !== 'undefined') {
      throw new BadRequestException('your Email has been taken!');
    }

    const isUsernameTaken= await this.userRepository.findOne({ username: signUpDto.username });
    if (typeof isUsernameTaken !== 'undefined') {
      throw new BadRequestException('your Username has been taken!');
    }

    const newUser = this.userRepository.create({
      username: signUpDto.username,
      password: signUpDto.password,
      email: signUpDto.email,
    });
    return this.userRepository.save(newUser);
  }
}
