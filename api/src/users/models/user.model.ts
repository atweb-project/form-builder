import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../core/base/base.model';
import { UserRole } from './user-role.enum';

export class User extends BaseModel<User> {
  @prop({
    required: [true, 'Email is required'],
    unique: true,
  })
  email: string;

  @prop({
    required: [true, 'Password is required'],
  })
  password: string;

  @prop() firstname: string;

  @prop() lastname: string;

  @prop({ enum: UserRole, default: UserRole.User })
  role?: UserRole;

  @prop()
  get fullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  static get model(): ModelType<User> {
    return new User().getModelForClass(User, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(): InstanceType<User> {
    return new this.model();
  }
}
