import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { DB_PROVIDER, USER_PROVIDER } from '../config';
import { User } from './models/user.model';

export const usersProviders = [
  {
    provide: User.modelName,
    useFactory: (connection: Connection) =>
      connection.model(User.modelName, User.model.schema),
    inject: [DB_PROVIDER],
  },
];
