import * as mongoose from 'mongoose';
import { DB_PROVIDER, MONGO_URI } from '../config';

export const databaseProviders = [
  {
    provide: DB_PROVIDER,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(MONGO_URI),
  },
];
