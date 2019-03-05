import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../interfaces/user.interface';
import { Int32 } from 'bson';

export class LoginResponseDto {
  @ApiModelProperty() token: string;

  @ApiModelProperty() user: User;

  @ApiModelProperty() expiresIn: Int32;
}
