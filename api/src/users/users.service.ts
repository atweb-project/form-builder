import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_PROVIDER } from '../config';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { JwtPayload } from '../core/auth/interfaces/jwt-payload.interface';
import { AuthService } from '../core/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_PROVIDER) private readonly userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

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

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const email = loginDto.email;

    const user = await this.findOne({ email });

    if (!user) {
      throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
    }

    const isMatch = await compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
    }

    const payload: JwtPayload = {
      email: user.email,
    };

    const tokenObject = await this.authService.createToken(payload);
    const token = tokenObject.token;
    const expiresIn = tokenObject.expiresIn;

    return {
      token,
      expiresIn,
      user,
    };
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(filter = {}): Promise<User> {
    return await this.userModel.findOne(filter).exec();
  }
}
