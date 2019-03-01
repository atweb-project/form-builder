import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_PROVIDER } from '../config';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_PROVIDER) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    const salt = await genSalt(10);
    createdUser.password = await hash(createUserDto.password, salt);
    try {
      return await createdUser.save();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(filter = {}): Promise<User> {
    return await this.userModel.findOne(filter).exec();
  }
}
