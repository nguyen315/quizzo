/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/Dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';


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
    return this.userRepository.update({id: id}, {lastname: lastname})
  }

  updateFirstName(id: number, firstname: string) {
    if (this.checkLength(firstname, 1, 20)) {
      throw new BadRequestException("first name length must be between 1 character and 20 characters")
    }
    return this.userRepository.update({id: id}, {firstname: firstname})
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

  async changePassword(id: number, password: string) {
    if (!this.checkPasswordLength) {
      throw new BadRequestException("Password length must be between 1 character and 20 characters")
    }
    const salt = await this.generateSalt()
    await this.updateSalt(id, salt)
    const hash = await this.generateHash(password, salt)
    await this.updateHash(id, hash)
    return true
  }

  updateHash(id: number, hash: string) {
    return this.userRepository.update({id: id}, {password: hash})
  }

  async generateHash(password: string, salt: string) {
    const hash = await bcrypt.hash(password, salt);
    return hash
  }

  async updateSalt(id: number, salt: string) {
    return await this.userRepository.update({id: id}, {salt: salt})
  }

  async generateSalt() {
    const salt = await bcrypt.genSalt();
    return salt
  }
  
  checkPasswordLength(password: string) {
    if (password.length > 20 || password.length < 6) {
      return true
    }
    return false
  }
 
}

