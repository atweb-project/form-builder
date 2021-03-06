import { ApiModelProperty } from '@nestjs/swagger';
import { FormControlDto } from './form-control.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFormDto {
  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty({ type: FormControlDto })
  readonly formControls: FormControlDto[];

  @ApiModelProperty()
  @IsNotEmpty()
  readonly userId: string;
}
