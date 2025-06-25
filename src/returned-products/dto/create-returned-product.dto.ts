import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReturnedProductDto {
  @ApiProperty({
    example: 'Damaged during transport',
    description: 'Reason why the product was returned',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({
    example: true,
    description: 'Is the returned product in brand-new condition?',
  })
  @IsBoolean()
  @IsNotEmpty()
  isNew: boolean;

  @ApiProperty({
    example: '89b77a08-be6e-4c0b-9a15-017d28af7d4e',
    description: 'ID of the contract linked to the returned product',
  })
  @IsString()
  @IsNotEmpty()
  contractId: string;
}
