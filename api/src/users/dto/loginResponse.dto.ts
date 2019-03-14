import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../interfaces/user.interface';

export class LoginResponseDto {
  @ApiModelProperty() token: string;

  @ApiModelProperty() firstname: string;

  @ApiModelProperty() lastname: string;

  @ApiModelProperty() email: string;

  @ApiModelProperty() role: string;

  @ApiModelProperty() expiresIn: number;
}
