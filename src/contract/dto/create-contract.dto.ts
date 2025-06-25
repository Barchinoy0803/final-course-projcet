import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDebtDto {
  @ApiProperty({ example: 120000, description: 'Total debt amount' })
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty({ example: 12, description: 'Number of months to pay the debt' })
  @IsNumber()
  @IsNotEmpty()
  time: number;

  @ApiProperty({ example: 'contract-uuid', description: 'ID of the contract linked to the debt' })
  @IsString()
  @IsNotEmpty()
  contractId: string;
}


export class CreateContractDto {
  @ApiProperty({ example: 100, description: 'Quantity of products in the contract' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 50000, description: 'Selling price per product unit' })
  @IsNumber()
  @IsNotEmpty()
  sellPrice: number;

  @ApiProperty({ example: 12, description: 'Time duration of the contract in months' })
  @IsNumber()
  @IsNotEmpty()
  time: number;

  @ApiProperty({ example: 'partner-uuid', description: 'ID of the partner involved in the contract' })
  @IsString()
  @IsNotEmpty()
  partnerId: string;

  @ApiProperty({ example: 'product-uuid', description: 'ID of the product involved in the contract' })
  @IsString()
  @IsNotEmpty()
  productId: string

}
