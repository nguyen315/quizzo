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

  async createUser(user: Omit<SignUpDto, 'confirmPassword'>): Promise<User> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  findByUsername(userName: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username: userName });
  }

  updateLastName(id: number, lastname: string) {
    if (this.checkLength(lastname, 1, 20)) {
      throw new BadRequestException("last name length must be between 1 character and 20 characters")
    }
    return this.userRepository.update({id: id}, {lastName: lastname})
  }

  updateFirstName(id: number, firstname: string) {
    if (this.checkLength(firstname, 1, 20)) {
      throw new BadRequestException("first name length must be between 1 character and 20 characters")
    }
    return this.userRepository.update({id: id}, {firstName: firstname})
  }

  checkLength(text: string, minLength: number, maxLength: number) {
    if (text.length < minLength || text.length > maxLength) {
      return true
    }
    return false
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email: email });
  }
 
}

