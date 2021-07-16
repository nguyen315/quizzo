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

  async updateUsername(id: number, username: string) {
    if (this.checkUsernameLength(username)) {
      throw new BadRequestException("Username length must be between 6 characters and 20 characters")
    }

    if (await this.isUsernameTaken(username)) {
      throw new BadRequestException("Username already existed")
    }

    return this.userRepository.update({id: id}, {username:username})
  }

  async isUsernameTaken(username: string) {
    const getUserInfo = await this.findByUsername(username)
    if (typeof getUserInfo !== 'undefined') {
      return true
    }
    return false
  }


  checkUsernameLength(username: string) {
    if (username.length > 20 || username.length < 6) {
      return true
    } 
    return false
  }

  updateLastName(id: number, lastname: string) {
    if (this.checkFirstNameLength(lastname)) {
      throw new BadRequestException("last name length must be between 1 character and 20 characters")
    }
    return this.userRepository.update({id: id}, {lastname: lastname})
  }

  checkLastNameLength(lastName: string) {
    if (lastName.length > 20 || lastName.length < 1) {
      return true
    }
    return false
  }

  updateFirstName(id: number, firstname: string) {
    if (this.checkFirstNameLength(firstname)) {
      throw new BadRequestException("first name length must be between 1 character and 20 characters")
    }
    return this.userRepository.update({id: id}, {firstname: firstname})
  }

  checkFirstNameLength(firstname: string) {
    if (firstname.length > 20 || firstname.length < 1) {
      return true
    }
    return false
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email: email });
  }
}

