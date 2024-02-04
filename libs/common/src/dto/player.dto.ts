import { IsNotEmpty, IsString } from 'class-validator';

export class PlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
