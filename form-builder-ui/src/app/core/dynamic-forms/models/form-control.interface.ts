import { FormGroup } from '@angular/forms';
import { IFormControlConfig } from './form-control-config.interface';

export interface IFormControl {
  config: IFormControlConfig;
  group: FormGroup;
}
