import * as mongoose from 'mongoose';

export const FormControlSchema = new mongoose.Schema({
  type: String,
  label: String,
  name: String,
  placeholder: String,
  value: String,
  validation: [],
  attributes: [Object],
});
