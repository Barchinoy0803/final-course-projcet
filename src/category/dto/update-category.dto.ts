import { IsBoolean, IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Drinks',
    description: 'The title/name of the category',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    example: 15,
    description: 'Time (in minutes) required to prepare items in this category',
  })
  @IsOptional()
  @IsNumber()
  time: number;

  @ApiProperty({
    example: true,
    description: 'Status of the category (active or not)',
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
