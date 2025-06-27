import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class BuyService {
  constructor(private readonly prisma: PrismaService) { }
  async create(dto: CreateBuyDto, req: Request) {
    try {
      const userId = req['user'].id
      const { quantity, ...rest } = dto;
      const quantityDecimal = new Prisma.Decimal(quantity);

      return await this.prisma.$transaction(async (tx) => {
        const buy = await tx.buy.create({
          data: {
            userId,
            quantity: quantityDecimal,
            ...rest,
          },
        });

        await tx.product.update({
          where: { id: dto.productId },
          data: {
            quantity: {
              increment: quantityDecimal,
            },
          },
        });

        return buy;
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.buy.findMany({
        skip,
        take: limit,
        include: {
          user: true,
          partner: true,
          product: true,
        },
      }),
      this.prisma.buy.count(),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const buy = await this.prisma.buy.findUnique({
      where: { id },
      include: {
        user: true,
        partner: true,
        product: true,
      },
    });

    if (!buy) {
      throw new NotFoundException(`Buy #${id} topilmadi`);
    }

    return buy;
  }

  async update(id: string, dto: UpdateBuyDto) {
    const existing = await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      if (
        dto.quantity !== undefined &&
        !new Prisma.Decimal(dto.quantity).equals(existing.quantity)
      ) {
        const diff = new Prisma.Decimal(dto.quantity).minus(existing.quantity);
        await tx.product.update({
          where: { id: existing.productId },
          data: {
            quantity: {
              increment: diff,
            },
          },
        });
      }

      return tx.buy.update({
        where: { id },
        data: {
          ...dto,
          quantity:
            dto.quantity !== undefined
              ? new Prisma.Decimal(dto.quantity)
              : undefined,
        },
      });
    });
  }

  async remove(id: string) {
    const existing = await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: existing.productId },
        data: {
          quantity: {
            decrement: existing.quantity,
          },
        },
      });

      return tx.buy.delete({ where: { id } });
    });
  }
}
