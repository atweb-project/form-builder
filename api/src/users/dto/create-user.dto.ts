// import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly firstname: string;

  @ApiModelProperty()
  readonly lastname: string;
}
