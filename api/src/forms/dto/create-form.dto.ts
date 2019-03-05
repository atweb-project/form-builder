import { ApiModelProperty } from '@nestjs/swagger';
import { FormControlDto } from './form-control.dto';

export class CreateFormDto {
  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty({ type: FormControlDto })
  readonly formControls: FormControlDto[];

  @ApiModelProperty()
  readonly userId: string;
}
