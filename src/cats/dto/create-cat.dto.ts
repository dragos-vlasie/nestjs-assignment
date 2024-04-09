import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({ description: 'The name of the cat', example: 'Fluffy', type: String })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The age of the cat', example: 2, type: Number })
  @IsInt()
  readonly age: number;

  @ApiProperty({ description: 'The breed of the cat', example: 'Persian', type: String })
  @IsString()
  readonly breed: string;
}