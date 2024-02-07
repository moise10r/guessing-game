import { FilterQuery, Model, Types, ClientSession } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger } from '@nestjs/common';

export abstract class AbstractRepository<Tdocument extends AbstractDocument> {
  protected readonly logger: Logger;
  constructor(protected readonly modal: Model<Tdocument>) {}

  async startTransaction(): Promise<ClientSession> {
    const session: ClientSession = await this.modal.startSession();
    await session.startTransaction();
    return session;
  }

  async endSession(session: ClientSession): Promise<boolean> {
    await session.endSession();
    return true;
  }

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
    return document;
  }
  async find(FilterQuery: FilterQuery<Tdocument>): Promise<Tdocument[]> {
    return await this.modal.find(FilterQuery).lean<Tdocument[]>(true);
  }
}
