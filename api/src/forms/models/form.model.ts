import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../core/base/base.model';
import { FormControl } from '../models/form-control.model';

export class Form extends BaseModel<Form> {
  @prop() title: string;
  @prop() description: string;
  @prop() formControls: FormControl[];
  @prop() userId: string;

  static get model(): ModelType<Form> {
    return new Form().getModelForClass(Form, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(): InstanceType<Form> {
    return new this.model();
  }
}
