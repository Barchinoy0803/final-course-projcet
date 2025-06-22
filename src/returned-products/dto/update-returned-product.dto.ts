import { PartialType } from '@nestjs/mapped-types';
import { CreateReturnedProductDto } from './create-returned-product.dto';

export class UpdateReturnedProductDto extends PartialType(CreateReturnedProductDto) {}
