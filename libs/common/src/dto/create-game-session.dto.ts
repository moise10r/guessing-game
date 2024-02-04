import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGameSessionDto {
  @IsNumber()
  @IsNotEmpty()
  freezePoint: number;
}
