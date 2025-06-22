import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from 'src/user-auth/dto/register-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(RegisterDto) {
  @ApiPropertyOptional({ example: 'New Name', description: 'Updated full name' })
  fullname?: string;

  @ApiPropertyOptional({ example: '+998901112233', description: 'Updated phone number' })
  phone?: string;

  @ApiPropertyOptional({ example: 'NewPass456!', description: 'Updated password' })
  password?: string;

  @ApiPropertyOptional({ example: true, description: 'Updated active status' })
  isActive?: boolean;

  @ApiPropertyOptional({ example: 200000, description: 'Updated balance' })
  balance?: number;
}
