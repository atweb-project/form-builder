import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty({ required: true })
  email: string;

  @ApiModelProperty({ required: true, type: String, format: 'password' })
  password: string;
}
