import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DebtService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createDebtDto: CreateDebtDto) {
    try {
      const debt = await this.prisma.debt.create({ data: createDebtDto })
      return debt
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const [data, total] = await this.prisma.$transaction([
        this.prisma.debt.findMany({
          skip,
          take: limit,
        }),
        this.prisma.debt.count(),
      ]);
      return {
        data,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const debt = await this.prisma.debt.findUnique({ where: { id } })
      if (!debt) return new NotFoundException("Not found")
      return debt
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateDebtDto: UpdateDebtDto) {
    try {
      const decrementAmount = updateDebtDto.total! / updateDebtDto.time!;

      const updatedDebt = await this.prisma.debt.update({
        where: { id },
        data: {
          ...updateDebtDto,
          total: {
            decrement: decrementAmount,
          },
        },
      });

      return updatedDebt;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.debt.delete({ where: { id } })
      return new HttpException("Successfully deleted!", HttpStatus.ACCEPTED)
    } catch (error) {
      console.log(error);
    }
  }
}
