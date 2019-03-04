import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { FORM_PROVIDER } from 'src/config';
import { Form } from './interfaces/form.interface';
import { Model } from 'mongoose';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormsService {
  constructor(@Inject(FORM_PROVIDER) private readonly formModel: Model<Form>) {}

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const createdForm = new this.formModel(createFormDto);
    try {
      return await createdForm.save();
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Form[]> {
    return await this.formModel.find().exec();
  }
}
