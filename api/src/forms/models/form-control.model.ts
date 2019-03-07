import { prop } from 'typegoose';

export class FormControl {
  @prop() type: string;
  @prop() label: string;
  @prop() name: string;
  @prop() placeholder: string;
  @prop() value: string;
  @prop() validation: string[];
  @prop() attributes: object[];
}
