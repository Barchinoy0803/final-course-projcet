import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateCategoryDto) {
    const exists = await this.prisma.category.findFirst({
      where: { title: { equals: dto.title, mode: 'insensitive' } },
      select: { id: true },
    })
    if (exists) throw new BadRequestException('Category already exists')
    return this.prisma.category.create({ data: dto })
  }

  async findAll() {
    try {
      let categories = await this.prisma.category.findMany()
      return categories
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      let category = await this.prisma.category.findUnique({ where: { id } })
      if (!category) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return category
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      let updated = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto
      })
      return updated
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.category.delete({ where: { id } })
      return new HttpException("Successfully deleted!", HttpStatus.ACCEPTED)
    } catch (error) {
      console.log(error);
    }
  }
}
