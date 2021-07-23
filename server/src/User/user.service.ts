import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/Auth/auth.service';
import { SignUpDto } from 'src/Dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService  {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
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
      throw new BadRequestException(
        'last name length must be between 1 character and 20 characters'
      );
    }
    return this.userRepository.update({ id: id }, { lastName: lastname });
  }

  updateFirstName(id: number, firstname: string) {
    if (this.checkLength(firstname, 1, 20)) {
      throw new BadRequestException(
        'First name length must be between 1 character and 20 characters'
      );
    }
    return this.userRepository.update({ id: id }, { firstName: firstname });
  }

  checkLength(text: string, minLength: number, maxLength: number) {
    if (text.length < minLength || text.length > maxLength) {
      return true;
    }
    return false;
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email: email });
  }

  async setActive(token: string): Promise<any>{
    const user= await this.userRepository.findOne({token:token});
    if (user.token === token){
      await this.userRepository.save({
        ...user,
        token:null,
        isActivated: true
      });
    }
  }

  async changePassword(id: number, newPassword: string, oldPassword: string) {
    // Get user's password that's stored in database
    const storedHash = await this.getStoredPassword(id);
    //Check if the entered old password is correct
    if (!(await this.comparePassword(oldPassword, storedHash))) {
      throw new BadRequestException('Old password is incorrect');
    }
    // Check if the length of new password is within the allowed range
    if (this.checkLength(newPassword, 6, 20)) {
      throw new BadRequestException(
        'Password length must be between 6 character and 20 characters'
      );
    }
    const salt = await this.generateSalt();
    const hash = await this.generateHash(newPassword, salt);
    await this.updateHash(id, hash);
    return true;
  }

  async comparePassword(enteredOldPassword: string, storedHash: string) {
    return await bcrypt.compare(enteredOldPassword, storedHash);
  }

  async getStoredPassword(id: number) {
    const user = await this.userRepository.findOne(id);
    return user.password;
  }

  async updateHash(id: number, hash: string) {
    return await this.userRepository.update({ id: id }, { password: hash });
  }

  async generateHash(password: string, salt: string) {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async generateSalt() {
    const SALTROUNDS = parseInt(process.env.SALTROUNDS) || 10;
    const salt = await bcrypt.genSalt(SALTROUNDS);
    return salt;
  }
}
