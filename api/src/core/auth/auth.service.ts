import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async createToken(payload: JwtPayload) {
    const email: JwtPayload = { email: payload.email };
    const token = this.jwtService.sign(email);
    return {
      expiresIn: 3600,
      token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return this.usersService.findOne({
      email: payload.email,
    });
  }
}
