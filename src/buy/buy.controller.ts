import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BuyService } from './buy.service';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';

@Controller('buys')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @Post()
  create(@Body() dto: CreateBuyDto) {
    return this.buyService.create(dto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.buyService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBuyDto) {
    return this.buyService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyService.remove(id);
  }
}