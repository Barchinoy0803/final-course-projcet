import { ROLE } from "@prisma/client";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePartnerDto {
  @ApiProperty({ example: "Ali Karimov", description: "Full name of the partner" })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: "+998901111111", description: "Phone number of the partner" })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: true, description: "Is partner active?" })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ example: 0, description: "Initial balance", required: false })
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiProperty({ enum: ROLE, example: ROLE.SELLER, description: "Role of the partner" })
  @IsEnum(ROLE)
  role: ROLE;

  @ApiProperty({ example: "Tashkent, Uzbekistan", description: "Address of the partner" })
  @IsString()
  @IsNotEmpty()
  address: string;
}
