import { Document } from 'mongoose';
import { FormControl } from './form-control.interface';

export interface Form extends Document {
  readonly title: string;
  readonly description: string;
  readonly formControls: FormControl[];
  readonly userId: string;
}
