import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({
        example: 'Drinks',
        description: 'The title/name of the category',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example: 15,
        description: 'Time (in minutes) required to prepare items in this category',
    })
    @IsNotEmpty()
    @IsNumber()
    time: number;

    @ApiProperty({
        example: true,
        description: 'Status of the category (active or not)',
    })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}
