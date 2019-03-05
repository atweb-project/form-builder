import { Document } from 'mongoose';

export interface FormControl extends Document {
  readonly type: string;
  readonly label: string;
  readonly name: string;
  readonly placeholder: string;
  readonly value: string;
  readonly validation: string[];
  readonly attributes: object[];
}
