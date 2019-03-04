import { Connection } from 'mongoose';
import { FormSchema } from './schemas/form.schema';
import { DB_PROVIDER, FORM_PROVIDER } from '../config';

export const formsProviders = [
  {
    provide: FORM_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model('Form', FormSchema),
    inject: [DB_PROVIDER],
  },
];
