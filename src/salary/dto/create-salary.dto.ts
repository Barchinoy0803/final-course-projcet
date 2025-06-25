import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSalaryDto {
  @ApiProperty({ example: 'user-id-uuid', description: 'User ID who receives salary' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 500000, description: 'Salary amount in UZS' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'Monthly salary for June', description: 'Comment about salary' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
