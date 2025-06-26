import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common'
import { ReturnedProductsService } from './returned-products.service'
import { CreateReturnedProductDto } from './dto/create-returned-product.dto'
import { UpdateReturnedProductDto } from './dto/update-returned-product.dto'

@Controller('returned-products')
export class ReturnedProductsController {
  constructor(private readonly service: ReturnedProductsService) {}

  @Post()
  create(@Body() dto: CreateReturnedProductDto) {
    return this.service.create(dto)
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.service.findAll(+page, +limit)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReturnedProductDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}