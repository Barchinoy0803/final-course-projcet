import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { TYPE } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPaymentDto: CreatePaymentDto, req: Request) {
    try {
      const userId = req['user'].id
      const payment = await this.prisma.payment.create({ data: { ...createPaymentDto, userId } })
      if (payment.type === TYPE.IN) {
        const debt = await this.prisma.debt.findFirst({ where: { id: payment.debtId } })
        const result = Number(payment.amount) / (Number(debt?.total) / Number(debt?.time))
        await this.prisma.debt.update({
          where: { id: payment.debtId },
          data: {
            time: {
              decrement: result
            },
            total: {
              decrement: payment.amount
            }
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {

    } catch (error) {
      console.log(error);
    }
  }
}
