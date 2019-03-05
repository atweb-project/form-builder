import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiUseTags('form-builder')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('addUser')
  @ApiOperation({ title: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
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

  @Post('login')
  @ApiOperation({ title: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'The user has logged in.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ): Promise<LoginResponseDto> {
    return this.usersService.login(loginDto);
  }

  @UseGuards(AuthGuard())
  @Get('getAll')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
