import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastname: string;
}
