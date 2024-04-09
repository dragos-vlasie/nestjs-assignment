import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateCatDto {
  @ApiProperty({ description: 'The name of the cat (optional)', required: false, example: 'Fluffy' })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ description: 'The breed of the cat (optional)', required: false, example: 'Persian' })
  @IsOptional()
  @IsString()
  readonly breed?: string;

  @ApiProperty({ description: 'The age of the cat (optional)', required: false, example: 2 })
  @IsOptional()
  @IsInt()
  readonly age?: number;
}
