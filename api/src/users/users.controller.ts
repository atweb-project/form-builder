import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('addUser')
  async create(@Body() createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    let exist: any;
    try {
      exist = await this.usersService.findOne({ email });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (exist) {
      throw new HttpException(`${email} exists`, HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }

  @Get('getAll')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
