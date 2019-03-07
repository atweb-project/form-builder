import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './models/form.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { BaseService } from 'src/core/base/base.service';

@Injectable()
export class FormsService extends BaseService<Form> {
  constructor(
    @InjectModel(Form.modelName) private readonly formModel: ModelType<Form>,
  ) {
    super();
    this.model = formModel;
  }

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const newForm = Form.createModel();
    newForm.title = createFormDto.title;
    newForm.description = createFormDto.description;
    newForm.formControls = createFormDto.formControls;
    newForm.userId = createFormDto.userId;

    try {
      return await this.save(newForm);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
