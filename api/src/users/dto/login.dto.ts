import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiModelProperty({ required: true, type: String, format: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
