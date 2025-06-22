import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReturnedProductsService } from './returned-products.service';
import { CreateReturnedProductDto } from './dto/create-returned-product.dto';
import { UpdateReturnedProductDto } from './dto/update-returned-product.dto';

@Controller('returned-products')
export class ReturnedProductsController {
  constructor(private readonly returnedProductsService: ReturnedProductsService) {}

  @Post()
  create(@Body() createReturnedProductDto: CreateReturnedProductDto) {
    return this.returnedProductsService.create(createReturnedProductDto);
  }

  @Get()
  findAll() {
    return this.returnedProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnedProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReturnedProductDto: UpdateReturnedProductDto) {
    return this.returnedProductsService.update(+id, updateReturnedProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnedProductsService.remove(+id);
  }
}
