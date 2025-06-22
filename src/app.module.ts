import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PartnersModule } from './partners/partners.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { DebtModule } from './debt/debt.module';
import { ContractModule } from './contract/contract.module';
import { SalaryModule } from './salary/salary.module';
import { PaymentModule } from './payment/payment.module';
import { BuyModule } from './buy/buy.module';
import { ReturnedProductsModule } from './returned-products/returned-products.module';
import { EskizModule } from './eskiz/eskiz.module';
import { UserAuthModule } from './user-auth/user-auth.module';

@Module({
  imports: [PrismaModule, UserModule, PartnersModule, CategoryModule, ProductModule, DebtModule, ContractModule, SalaryModule, PaymentModule, BuyModule, ReturnedProductsModule, EskizModule, UserAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
