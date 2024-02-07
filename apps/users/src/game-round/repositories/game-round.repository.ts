import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { GameRoundDocument } from '../models/game-round.shema';

@Injectable()
export class GameRoundRepository extends AbstractRepository<GameRoundDocument> {
  protected readonly logger = new Logger(GameRoundRepository.name);
  constructor(
    @InjectModel(GameRoundDocument.name)
    gameRoundDocument: Model<GameRoundDocument>,
  ) {
    super(gameRoundDocument);
  }
}
