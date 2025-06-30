import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDto {
  @ApiProperty({ example: 'Drinks', description: 'Category title' })
  @IsNotEmpty() @IsString()
  title: string

  @ApiProperty({ example: 15, description: 'Preparation time (min)' })
  @IsNotEmpty() @IsNumber()
  time: number

  @ApiProperty({ example: true, description: 'Active status' })
  @IsNotEmpty() @IsBoolean()
  isActive: boolean

  @ApiProperty({ example: 'https://cdn.com/img.png', required: false })
  @IsOptional() @IsString()
  image?: string
}
