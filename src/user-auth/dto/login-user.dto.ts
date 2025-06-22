import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '+998901234567', description: 'Phone number used for login' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'secureP@ssword123', description: 'Password for the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
