/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import { isEmail } from 'class-validator';


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

  reassign(id: number, email: string, username: string, password: string) {
    if (this.checkUsernameLength(username) &&
        this.checkPasswordLength(password) &&
        this.checkIfEmailValid(email)) {
      return this.userRepository.update( {id:id}, {email: email, username: username, password: password})
    }
    throw new BadRequestException("Failed to update")
  }

  checkUsernameLength(username: string) {
    if (username.length > 20 || username.length < 6) {
      return false
    } 
    return true
  }

  checkPasswordLength(password: string) {
    if (password.length > 20 || password.length < 6) {
      return false
    }
    return true
  }

  checkIfEmailValid(email: string) {
    if (isEmail(email)) {
      return true
    }
    return false
  }
}

