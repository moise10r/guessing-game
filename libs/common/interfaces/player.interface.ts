import { ObjectId } from 'mongoose';

export interface IPlayer {
  _id?: ObjectId;
  name: string;
  score: number;
}
