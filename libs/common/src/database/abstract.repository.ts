import { FilterQuery, Model, Types } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<Tdocument extends AbstractDocument> {
  protected readonly logger: Logger;
  constructor(protected readonly modal: Model<Tdocument>) {}

  async create(
    document: Omit<Tdocument, '_id' | 'createdAt'>,
  ): Promise<Tdocument> {
    const createdDocument = new this.modal({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as Tdocument;
  }

  async findOne(FilterQuery: FilterQuery<Tdocument>): Promise<Tdocument> {
    const document = await this.modal
      .findOne(FilterQuery)
      .lean<Tdocument>(true);
    if (!document) {
      this.logger.warn('Document was not found with FilterQuery', FilterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }
  async find(FilterQuery: FilterQuery<Tdocument>): Promise<Tdocument[]> {
    return await this.modal.find(FilterQuery).lean<Tdocument[]>(true);
  }
}
