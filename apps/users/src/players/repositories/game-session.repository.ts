import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { GameSectionDocument } from '../models/game-session.shema';

@Injectable()
export class GameSectionRepository extends AbstractRepository<GameSectionDocument> {
  protected readonly logger = new Logger(GameSectionRepository.name);
  constructor(
    @InjectModel(GameSectionDocument.name)
    gameSectionDocument: Model<GameSectionDocument>,
  ) {
    super(gameSectionDocument);
  }
}
