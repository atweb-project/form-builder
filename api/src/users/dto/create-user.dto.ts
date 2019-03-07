import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../models/user-role.enum';

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

  @ApiModelPropertyOptional({ enum: UserRole })
  role?: UserRole;
}
