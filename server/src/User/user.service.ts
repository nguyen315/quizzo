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

  async updateUsername(id: number, username: string) {
    if (!this.checkUsernameLength) {
      throw new BadRequestException("Username length must be between 6 characters and 20 characters")
    }

    if (await this.isUsernameTaken(username)) {
      throw new BadRequestException("Username already existed")
    }

    return this.userRepository.update({id: id}, {username:username})
  }

  updatePassword(id: number, password: string) {
    if (!this.checkPasswordLength) {
      throw new BadRequestException("Password length must be between 6 characters and 20 characters")
    }

    return this.userRepository.update({id: id}, {password: password})
  }

  async updateEmail(id: number, email: string) {
    if (!this.checkIfEmailValid) {
      throw new BadRequestException("Email is invalid")
    }

    if (await this.isEmailRegistered(email)) {
      throw new BadRequestException("Email already existed")
    }

    return this.userRepository.update({id: id}, {email: email})
  }

  async isUsernameTaken(username: string) {
    const isUsernameTaken= await this.findByUsername(username)
    if (typeof isUsernameTaken !== 'undefined') {
      return true
    }
    return false
  }

  async isEmailRegistered(email: string) {
    const isEmailRegistered = await this.userRepository.findOne({ email: email })
    if (typeof isEmailRegistered !== 'undefined') {
      return true
    }
    return false
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

