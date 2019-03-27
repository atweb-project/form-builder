import { ValidatorFn } from '@angular/forms';

export interface IFormControlConfig {
  disabled?: boolean;
  required?: boolean;
  label?: string;
  labelResource?: string;
  name?: string;
  options?: string[];
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  value?: any;
  loading?: boolean;
  controlLabel?: string;
  containerId?: string;
}
