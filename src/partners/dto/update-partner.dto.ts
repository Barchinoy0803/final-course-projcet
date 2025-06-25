import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerDto } from './create-partner.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ROLE } from '@prisma/client';

export class UpdatePartnerDto {
    @ApiProperty({ example: "Ali Karimov", description: "Full name of the partner" })
    @IsString()
    @IsOptional()
    fullname: string;

    @ApiProperty({ example: "+998901234567", description: "Phone number of the partner" })
    @IsString()
    @IsOptional()
    phone: string;

    @ApiProperty({ example: true, description: "Is partner active?" })
    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @ApiProperty({ example: 100000, description: "Initial balance", required: false })
    @IsNumber()
    @IsOptional()
    balance: number;

    @ApiProperty({ enum: ROLE, example: ROLE.SELLER, description: "Role of the partner" })
    @IsEnum(ROLE)
    role: ROLE;

    @ApiProperty({ example: "Tashkent, Uzbekistan", description: "Address of the partner" })
    @IsString()
    @IsOptional()
    address: string;
}
