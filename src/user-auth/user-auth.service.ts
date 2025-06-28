import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EskizService } from '../eskiz/eskiz.service';
import { JwtService } from '@nestjs/jwt';
import { totp } from 'otplib';
import * as bcrypt from "bcrypt"
import { LoginDto } from './dto/login-user.dto';
import { USER_STATUS } from '@prisma/client';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eskizService: EskizService,
    private readonly jwtService: JwtService
  ) {
    totp.options = { step: 600, digits: 6 }
  }

  async findUser(phone: string) {
    let user = await this.prisma.user.findUnique({ where: { phone } })
    return user
  }

  async register(registerUserDto: RegisterDto) {
    try {
      const OTP_SECRET = process.env.OTP_SECRET
      let { phone, password } = registerUserDto
      let user = await this.prisma.user.findUnique({ where: { phone } })
      if (user) return new BadRequestException("Already registered!")
      let hashedPassword = await bcrypt.hash(password, 10)
      let newUser = { ...registerUserDto, password: hashedPassword }
      // await this.eskizService.sendSms("Bu Eskiz dan test", phone)
      const otp = await totp.generate(OTP_SECRET!)
      await this.prisma.user.create({ data: newUser })
      return { newUser, otp }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async activate(phone: string, otp: string) {
    try {
      const OTP_SECRET = process.env.OTP_SECRET
      let user = await this.findUser(phone)
      if (!user) return new NotFoundException("Not found user, please register!")

      if (user.status === USER_STATUS.ACTIVE) return { message: "This user already activated, please login" }

      const isValid = totp.check(otp, OTP_SECRET!)
      if (!isValid) return "Invalid otp"
      await this.prisma.user.update({
        data: { status: USER_STATUS.ACTIVE },
        where: { phone }
      })
      return { message: "Your account successfully activated!" }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async login(loginDto: LoginDto) {
    try {
      let { phone, password } = loginDto

      let user = await this.prisma.user.findUnique({ where: { phone } })

      if (!user) return new NotFoundException("Not found this user, please register")

      if (user.status === USER_STATUS.INACTIVE) return new BadRequestException("Your account is not activated, please activate!")

      let matchPassword = await bcrypt.compare(password, user.password)

      if (!matchPassword) throw new BadRequestException("Wrong credentials!");

      const token = await this.generateAccessToken({ id: user.id, role: user.role! });

      return { token };
    } catch (error) {
      throw new InternalServerErrorException(error, "errror")
    }
  }


  async generateAccessToken(payload: { id: string, role: string }) {
    const token = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: '1d'
    });
    return token;
  }
}
