import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, req: Request) {
    try {
      const userId = req['user'].id;
      const product = await this.prisma.product.create({
        data: {
          ...createProductDto,
          userId,
        },
      });
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      const [products, totalCount] = await Promise.all([
        this.prisma.product.findMany({
          where: {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          skip: (pageNumber - 1) * limitNumber,
          take: limitNumber,
        }),
        this.prisma.product.count({
          where: {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
        }),
      ]);

      return {
        data: products,
        totalCount,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });
      if (!product) throw new NotFoundException('Product not found');
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const existing = await this.prisma.product.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException('Product not found');

      const updated = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });

      return updated;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const existing = await this.prisma.product.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException('Product not found');

      await this.prisma.product.delete({ where: { id } });

      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
