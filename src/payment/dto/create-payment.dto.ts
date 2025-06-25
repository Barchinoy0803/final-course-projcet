import { PAYMENT_TYPE, TYPE } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePaymentDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number
    
    @IsString()
    @IsNotEmpty()
    comment: string

    @IsEnum(PAYMENT_TYPE)
    paymentType: PAYMENT_TYPE 
    
    @IsEnum(TYPE)
    type: TYPE
    
    @IsString()
    @IsNotEmpty()
    partnerId: string
    
    @IsString()
    @IsNotEmpty()
    debtId: string
}
