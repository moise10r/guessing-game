import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { GameSessionDocument } from '../models/game-session.shema';

@Injectable()
export class GameSessionRepository extends AbstractRepository<GameSessionDocument> {
  protected readonly logger = new Logger(GameSessionRepository.name);
  constructor(
    @InjectModel(GameSessionDocument.name)
    gameSessionDocument: Model<GameSessionDocument>,
  ) {
    super(gameSessionDocument);
  }
}
