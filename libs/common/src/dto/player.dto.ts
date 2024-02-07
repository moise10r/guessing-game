import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;
}
