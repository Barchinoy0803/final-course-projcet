import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ReturnedProductsService } from './returned-products.service';
import { CreateReturnedProductDto } from './dto/create-returned-product.dto';
import { UpdateReturnedProductDto } from './dto/update-returned-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Returned Products')
@Controller('returned-products')
export class ReturnedProductsController {
  constructor(private readonly service: ReturnedProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a returned product' })
  @ApiResponse({ status: 201, description: 'Returned product created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() dto: CreateReturnedProductDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated list of returned products' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, example: 20, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'List of returned products' })
  findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.service.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single returned product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the returned product' })
  @ApiResponse({ status: 200, description: 'Returned product found' })
  @ApiResponse({ status: 404, description: 'Returned product not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a returned product' })
  @ApiParam({ name: 'id', description: 'ID of the returned product' })
  @ApiResponse({ status: 200, description: 'Returned product updated successfully' })
  @ApiResponse({ status: 404, description: 'Returned product not found' })
  update(@Param('id') id: string, @Body() dto: UpdateReturnedProductDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a returned product' })
  @ApiParam({ name: 'id', description: 'ID of the returned product' })
  @ApiResponse({ status: 200, description: 'Returned product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Returned product not found' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
