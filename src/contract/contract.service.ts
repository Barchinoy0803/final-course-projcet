import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ContractService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createContractDto: CreateContractDto, req: Request) {
    try {
      const userId = req['user'].id
      const product = await this.prisma.product.findUnique({where: {id: createContractDto.productId}})

      if(!product) throw new Error("Product not found")
      if(+product.quantity < +createContractDto.quantity) throw new Error('There is no enought product!')

      const category = await this.prisma.category.findUnique({where: {id: product.categoryId}})

      const contract = await this.prisma.contract.create({ data: { ...createContractDto, userId } })
      if(contract){
        const {id, sellPrice, quantity, time} = contract;
        await this.prisma.debt.create({data: {
          total: +sellPrice * +quantity,
          contractId: id,
          time: time ?? category?.time
        }})
        await this.prisma.product.update({
          data: { quantity: { decrement: createContractDto.quantity } },
          where: {id: createContractDto.productId}
        })
      }
      return contract
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const [data, total] = await this.prisma.$transaction([
        this.prisma.contract.findMany({
          skip,
          take: limit,
        }),
        this.prisma.contract.count(),
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
      const contract = await this.prisma.contract.findUnique({ where: { id } })
      if (!contract) return new NotFoundException("Not found")
      return contract
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateContractDto: UpdateContractDto) {
    try {
      const updated = await this.prisma.contract.update({
        where: { id },
        data: updateContractDto
      })
      return updated
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.contract.delete({ where: { id } })
      return new HttpException("Successfully deleted!", HttpStatus.ACCEPTED)
    } catch (error) {
      console.log(error);
    }
  }
}
