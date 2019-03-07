import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../interfaces/user.interface';

export class LoginResponseDto {
  @ApiModelProperty() token: string;

  @ApiModelProperty() user: User;

  @ApiModelProperty() expiresIn: number;
}
