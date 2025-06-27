import { PAYMENT_TYPE, TYPE } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 100000, description: 'Amount paid by the partner' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'Initial payment for product X', description: 'Comment or description of the payment' })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ enum: PAYMENT_TYPE, example: PAYMENT_TYPE.CASH, description: 'Payment type (e.g. CASH, CARD)' })
  @IsEnum(PAYMENT_TYPE)
  paymentType: PAYMENT_TYPE;

  @ApiProperty({ enum: TYPE, example: TYPE.IN, description: 'Type of transaction (INCOME or OUTCOME)' })
  @IsEnum(TYPE)
  type: TYPE;

  @ApiProperty({ example: 'uuid-of-partner', description: 'ID of the partner who made the payment' })
  @IsString()
  @IsNotEmpty()
  partnerId: string;

  @ApiProperty({ example: 'uuid-of-debt', description: 'ID of the related debt' })
  @IsString()
  @IsNotEmpty()
  debtId: string;
}
