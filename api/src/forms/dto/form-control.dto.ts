import { ApiModelProperty } from '@nestjs/swagger';

export class FormControlDto {
  @ApiModelProperty()
  readonly type: string;

  @ApiModelProperty()
  readonly label: string;

  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly placeholder: string;

  @ApiModelProperty()
  readonly value: string;

  @ApiModelProperty()
  readonly validation: string[];

  @ApiModelProperty()
  readonly attributes: object[];
}
