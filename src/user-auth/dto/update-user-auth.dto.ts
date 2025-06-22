import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register-user.dto';

export class UpdateUserAuthDto extends PartialType(RegisterDto) {}
