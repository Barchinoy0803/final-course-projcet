import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { RegisterDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  register(@Body() createUserAuthDto: RegisterDto) {
    return this.userAuthService.register(createUserAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() loginDto: LoginDto) {
    return this.userAuthService.login(loginDto);
  }

  @Post('activate')
  @ApiOperation({ summary: 'Activate user by OTP' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: {
          type: 'string',
          example: '+998901234567',
        },
        otp: {
          type: 'string',
          example: '123456',
        },
      },
      required: ['phone', 'otp'],
    },
  })
  @ApiResponse({ status: 200, description: 'User activated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP or phone' })
  activate(@Body() body: { phone: string; otp: string }) {
    return this.userAuthService.activate(body.phone, body.otp);
  }
}
