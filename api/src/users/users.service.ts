import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { JwtPayload } from '../core/auth/interfaces/jwt-payload.interface';
import { AuthService } from '../core/auth/auth.service';
import { BaseService } from '../core/base/base.service';
import { ModelType } from 'typegoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly userModel: ModelType<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
    super();
    this.model = userModel;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = User.createModel();
    newUser.email = createUserDto.email;
    newUser.firstname = createUserDto.firstname;
    newUser.lastname = createUserDto.lastname;
    const salt = await genSalt(10);
    newUser.password = await hash(createUserDto.password, salt);
    try {
      return await this.save(newUser);
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
    const firstname = user.firstname;
    const lastname = user.lastname;
    const role = user.role;

    return {
      token,
      expiresIn,
      firstname,
      lastname,
      email,
      role,
    };
  }
}
