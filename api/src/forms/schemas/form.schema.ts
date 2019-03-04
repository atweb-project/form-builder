import * as mongoose from 'mongoose';
import { FormControlSchema } from './form-control.schema';

export const FormSchema = new mongoose.Schema({
  title: String,
  description: String,
  formControls: [FormControlSchema],
  userId: String,
});
