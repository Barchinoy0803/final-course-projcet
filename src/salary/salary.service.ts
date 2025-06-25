import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';

@Injectable()
export class SalaryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createSalaryDto: CreateSalaryDto) {
    try {
      const { userId, amount, comment } = createSalaryDto;

      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');

      const salary = await this.prisma.salary.create({
        data: { userId, amount, comment },
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      return salary;
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const pageNumber = Number(page) || 1;
      const limitNumber = Number(limit) || 10;

      const [salaries, totalCount] = await this.prisma.$transaction([
        this.prisma.salary.findMany({
          include: { user: true },
          skip: (pageNumber - 1) * limitNumber,
          take: limitNumber,
        }),
        this.prisma.salary.count(),
      ]);

      return {
        data: salaries,
        totalCount,
        totalPages: Math.ceil(totalCount / limitNumber),
        currentPage: pageNumber,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }



  async findOne(id: string) {
    try {
      const salary = await this.prisma.salary.findUnique({
        where: { id },
        include: { user: true },
      });

      if (!salary) throw new NotFoundException('Salary not found');
      return salary;
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  async update(id: string, dto: UpdateSalaryDto) {
    try {
      const salary = await this.prisma.salary.findUnique({ where: { id } });
      if (!salary) throw new NotFoundException('Salary not found');

      return await this.prisma.salary.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  async remove(id: string) {
    try {
      const salary = await this.prisma.salary.findUnique({ where: { id } });
      if (!salary) throw new NotFoundException('Salary not found');

      await this.prisma.user.update({
        where: { id: salary.userId },
        data: {
          balance: {
            decrement: salary.amount,
          },
        },
      });

      return await this.prisma.salary.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

}
