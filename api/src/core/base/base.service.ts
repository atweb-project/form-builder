import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InstanceType, ModelType, Typegoose } from 'typegoose';

@Injectable()
export abstract class BaseService<T extends Typegoose> {
  protected model: ModelType<T>;
  // protected _mapper: AutoMapperJs.AutoMapper;

  private get modelName(): string {
    return this.model.modelName;
  }

  async findAll(filter = {}): Promise<Array<InstanceType<T>>> {
    return this.model.find(filter).exec();
  }

  async findOne(filter = {}): Promise<InstanceType<T>> {
    return this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<InstanceType<T>> {
    return this.model.findById(this.toObjectId(id)).exec();
  }

  async save(item: InstanceType<T>): Promise<InstanceType<T>> {
    return this.model.create(item);
  }

  async delete(id: string): Promise<InstanceType<T>> {
    return this.model.findByIdAndRemove(this.toObjectId(id)).exec();
  }

  async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
    return this.model
      .findByIdAndUpdate(this.toObjectId(id), item, { new: true })
      .exec();
  }

  async clearCollection(filter = {}): Promise<void> {
    this.model.deleteMany(filter).exec();
  }

  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }

  /* private get viewModelName(): string {
    return `${this.model.modelName}Vm`;
} */

  /* async map<K>(
    object: Partial<InstanceType<T>> | Partial<InstanceType<T>>[],
    sourceKey: string = this.modelName,
    destinationKey: string = this.viewModelName,
): Promise<K> {
    return this._mapper.map(sourceKey, destinationKey, object);
} */
}
