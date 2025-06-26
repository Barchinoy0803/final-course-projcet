import { IsUUID, IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBuyDto {
  @ApiProperty({ example: 10.5, description: 'Quantity of product being bought' })
  @IsNumber()
  @Min(0.0001)
  quantity!: number;

  @ApiProperty({ example: 'Paid in cash', description: 'Optional comment about the purchase' })
  @IsString()
  @IsNotEmpty()
  comment!: string;

  @ApiProperty({ example: 10000, description: 'Total price of the purchase' })
  @IsNumber()
  @Min(0)
  buyPrice!: number;

  @ApiProperty({ example: '820dcd4d-5f08-4f01-8e04-2e95e6e5a9a9' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ example: '720b651d-6f46-41dc-a5d7-1c87947e79b3' })
  @IsUUID()
  partnerId!: string;

  @ApiProperty({ example: 'f6d1edb9-3eb6-4b27-8e56-4a4b5b04cbe7' })
  @IsUUID()
  productId!: string;
}
