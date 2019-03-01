import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { DB_PROVIDER, USER_PROVIDER } from '../config';

export const usersProviders = [
  {
    provide: USER_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [DB_PROVIDER],
  },
];
