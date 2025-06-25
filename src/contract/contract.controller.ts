// contract.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorators';
import { USER_ROLE } from '@prisma/client';
import { SelfGuard } from '../guards/self.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Contracts')
@ApiBearerAuth()
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) { }

  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new contract' })
  @ApiResponse({ status: 201, description: 'Contract successfully created' })
  create(@Body() createContractDto: CreateContractDto, @Req() req: Request) {
    return this.contractService.create(createContractDto, req);
  }

  @Roles(USER_ROLE.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  @ApiOperation({ summary: 'Get all contracts with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Items per page (default: 10)' })
  @ApiResponse({ status: 200, description: 'Paginated list of contracts' })
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.contractService.findAll(Number(page), Number(limit));
  }

  @Roles(USER_ROLE.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a contract by ID' })
  @ApiParam({ name: 'id', description: 'Contract ID' })
  @ApiResponse({ status: 200, description: 'Contract found' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a contract' })
  @ApiParam({ name: 'id', description: 'Contract ID' })
  @ApiResponse({ status: 200, description: 'Contract updated successfully' })
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(id, updateContractDto);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contract' })
  @ApiParam({ name: 'id', description: 'Contract ID' })
  @ApiResponse({ status: 200, description: 'Contract deleted successfully' })
  remove(@Param('id') id: string) {
    return this.contractService.remove(id);
  }
}
