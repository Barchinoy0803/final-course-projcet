import { Injectable } from '@nestjs/common';
import { CreateReturnedProductDto } from './dto/create-returned-product.dto';
import { UpdateReturnedProductDto } from './dto/update-returned-product.dto';

@Injectable()
export class ReturnedProductsService {
  create(createReturnedProductDto: CreateReturnedProductDto) {
    return 'This action adds a new returnedProduct';
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
