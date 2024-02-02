import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { PlayerDocument } from '../models/player.schema';
import { AbstractRepository } from '@app/common/database/abstract.repository';

@Injectable()
export class PlayerRepository extends AbstractRepository<PlayerDocument> {
  protected readonly logger = new Logger(PlayerRepository.name);
  constructor(
    @InjectModel(PlayerDocument.name) PlayerDocument: Model<PlayerDocument>,
  ) {
    super(PlayerDocument);
  }
}
