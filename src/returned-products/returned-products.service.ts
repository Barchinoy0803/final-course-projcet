import { Injectable } from '@nestjs/common';
import { CreateReturnedProductDto } from './dto/create-returned-product.dto';
import { UpdateReturnedProductDto } from './dto/update-returned-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReturnedProductsService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createReturnedProductDto: CreateReturnedProductDto) {
    try {
      const returnedProduct = await this.prisma.returnedProducts.create({data: createReturnedProductDto})
      const contract = await this.prisma.contract.findFirst({where: {id: createReturnedProductDto.contractId}})
      if(createReturnedProductDto.isNew){
        await this.prisma.partners.update({
          data: { balance: { decrement: +contract?.quantity! * +contract?.sellPrice! } },
          where: {id: contract?.partnerId}
        })
      }
      await this.prisma.contract.delete({where: {id: contract?.id}})
      return returnedProduct;
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    return `This action returns all returnedProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} returnedProduct`;
  }

  update(id: number, updateReturnedProductDto: UpdateReturnedProductDto) {
    return `This action updates a #${id} returnedProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} returnedProduct`;
  }
}
