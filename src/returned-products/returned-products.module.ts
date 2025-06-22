import { Module } from '@nestjs/common';
import { ReturnedProductsService } from './returned-products.service';
import { ReturnedProductsController } from './returned-products.controller';

@Module({
  controllers: [ReturnedProductsController],
  providers: [ReturnedProductsService],
})
export class ReturnedProductsModule {}
