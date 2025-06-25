import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UNIT_TYPE } from '@prisma/client';

export class UpdateProductDto {
    @ApiProperty({
        example: 'Premium Apple Juice',
        description: 'The name/title of the product',
    })
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty({
        example: 12000,
        description: 'The selling price of the product in UZS',
    })
    @IsNumber()
    @IsOptional()
    sellPrice: number;

    @ApiProperty({
        example: 9000,
        description: 'The buying price of the product in UZS',
    })
    @IsNumber()
    @IsOptional()
    buyPrice: number;

    @ApiProperty({
        example: 50,
        description: 'The quantity of the product available in stock',
    })
    @IsNumber()
    @IsOptional()
    quantity: number;

    @ApiProperty({
        example: UNIT_TYPE.PIECE,
        enum: UNIT_TYPE,
        description: 'Unit type for the product (e.g., PIECE, KILOGRAM, LITER)',
    })
    @IsOptional()
    @IsEnum(UNIT_TYPE)
    unit: UNIT_TYPE;

    @ApiProperty({
        example: 'Imported directly from Germany. Fresh and organic.',
        description: 'Optional comment or description about the product',
    })
    @IsString()
    @IsOptional()
    comment: string;

    @ApiProperty({
        example: true,
        description: 'Product active status (true = visible, false = hidden)',
    })
    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        example: 'https://example.com/images/juice.jpg',
        description: 'URL of the product image or base64 string',
    })
    @IsString()
    @IsOptional()
    image: string;

    @ApiProperty({
        example: '4d5f9a77-c946-4ef9-8d71-7383cf7ae0c2',
        description: 'ID of the category this product belongs to',
    })
    @IsString()
    @IsOptional()
    categoryId: string;
}
