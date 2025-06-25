import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPartnerDto: CreatePartnerDto, req: Request) {
    try {
      const userId = req['user'].id
      const partner = await this.prisma.partners.create({ data: { ...createPartnerDto, userId } })
      return partner
    } catch (error) {
      console.log(error);
    }
  }


  async findAll(search?: string, page = 1, limit = 10) {
    try {
      const where: Prisma.PartnersWhereInput | undefined = search
        ? {
          OR: [
            { fullname: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
            { address: { contains: search, mode: 'insensitive' } },
          ],
        }
        : undefined;

      const skip = (page - 1) * limit;

      const [data, total] = await this.prisma.$transaction([
        this.prisma.partners.findMany({
          where,
          skip,
          take: limit,
        }),
        this.prisma.partners.count({ where }),
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
      const partner = await this.prisma.partners.findUnique({ where: { id } })
      if (!partner) return new NotFoundException("Not found this partner!")
      return partner
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    try {
      const updatedPartner = await this.prisma.partners.update({
        where: { id },
        data: updatePartnerDto
      })
      return updatedPartner
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.partners.delete({ where: { id } })
      return new HttpException("Successfully deleted!", HttpStatus.ACCEPTED)
    } catch (error) {
      console.log(error);
    }
  }
}
