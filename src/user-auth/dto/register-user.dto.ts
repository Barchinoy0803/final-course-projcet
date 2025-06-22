import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: '+998901234567', description: 'User phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'StrongPass123!', description: 'Password for the user' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: true, description: 'Account active status' })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
