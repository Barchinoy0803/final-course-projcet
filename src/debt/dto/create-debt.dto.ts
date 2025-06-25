import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateDebtDto {
  @ApiProperty({
    example: 1000.5,
    description: 'Qarzning umumiy summasi',
  })
  @IsNumber({}, { message: 'total raqam bo‘lishi kerak' })
  @IsPositive({ message: 'total musbat bo‘lishi kerak' })
  total!: number;

  @ApiProperty({
    example: 12,
    description: 'To‘lov davri (oylarda)',
  })
  @IsNumber({}, { message: 'time raqam bo‘lishi kerak' })
  @IsPositive({ message: 'time musbat bo‘lishi kerak' })
  time!: number;

  @ApiProperty({
    example: '5a17d144-0c5c-4d32-a4c9-2acd517e7b74',
    description: 'Bog‘liq kontraktning UUID identifikatori',
  })
  @IsUUID('4', { message: 'contractId noto‘g‘ri UUID' })
  contractId!: string;
}
