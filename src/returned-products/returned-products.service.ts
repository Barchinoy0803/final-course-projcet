import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { CreateReturnedProductDto } from './dto/create-returned-product.dto'
import { UpdateReturnedProductDto } from './dto/update-returned-product.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { CONTRACT_TYPE } from '@prisma/client';

@Injectable()
export class ReturnedProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReturnedProductDto) {
    try {
      return this.prisma.$transaction(async tx => {
        const returnedProduct = await tx.returnedProducts.create({ data: dto })
        const contract = await tx.contract.findUnique({ where: { id: dto.contractId } })
        if (!contract) throw new NotFoundException('Contract not found')
        await tx.partners.update({
          where: { id: contract.partnerId },
          data: {
            balance: { decrement: +contract.quantity * +contract.sellPrice },
          },
        })
        if (dto.isNew) {
          await tx.product.update({
            where: { id: contract.productId },
            data: { quantity: { increment: contract.quantity } },
          })
        }
        await tx.contract.update({ where: { id: contract.id }, data: {status: CONTRACT_TYPE.RETURNED}})
        return returnedProduct
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit
    const [data, total] = await this.prisma.$transaction([
      this.prisma.returnedProducts.findMany({
        skip,
        take: limit,
        include: { contract: true },
      }),
      this.prisma.returnedProducts.count(),
    ])
    return { data, total, page, limit }
  }

  async findOne(id: string) {
    const returnedProduct = await this.prisma.returnedProducts.findUnique({
      where: { id },
      include: { contract: true },
    })
    if (!returnedProduct) throw new NotFoundException('Returned product not found')
    return returnedProduct
  }

  async update(id: string, dto: UpdateReturnedProductDto) {
    return this.prisma.returnedProducts.update({ where: { id }, data: dto })
  }

  async remove(id: string) {
    return this.prisma.returnedProducts.delete({ where: { id } })
  }
}