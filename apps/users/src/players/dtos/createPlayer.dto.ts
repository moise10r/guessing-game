import { IsString, IsNotEmpty, IsNumber, IsNegative } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNegative()
  score: string;
}
