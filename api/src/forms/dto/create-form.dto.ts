import { ApiModelProperty } from '@nestjs/swagger';
import { FormControl } from '../interfaces/form-control.interface';

export class CreateFormDto {
  @ApiModelProperty()
  readonly title: string;

  @ApiModelProperty()
  readonly description: string;

  @ApiModelProperty()
  readonly formControls: FormControl[];

  @ApiModelProperty()
  readonly userId: string;
}
