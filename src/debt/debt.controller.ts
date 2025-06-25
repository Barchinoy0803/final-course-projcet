import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorators';
import { USER_ROLE } from '@prisma/client';
import { SelfGuard } from 'src/guards/self.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Debts')
@ApiBearerAuth()
@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) { }

  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new debt record' })
  @ApiResponse({ status: 201, description: 'Debt created successfully' })
  create(@Body() createDebtDto: CreateDebtDto) {
    return this.debtService.create(createDebtDto);
  }

  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  @ApiOperation({ summary: 'Get all debts with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Items per page (default: 10)' })
  @ApiResponse({ status: 200, description: 'List of debts with pagination' })
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    return this.debtService.findAll(Number(page), Number(limit));
  }

  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific debt by ID' })
  @ApiParam({ name: 'id', description: 'Debt ID' })
  @ApiResponse({ status: 200, description: 'Debt found' })
  findOne(@Param('id') id: string) {
    return this.debtService.findOne(id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a debt (decrement total by total/time)' })
  @ApiParam({ name: 'id', description: 'Debt ID' })
  @ApiResponse({ status: 200, description: 'Debt updated successfully' })
  update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtService.update(id, updateDebtDto);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a debt by ID' })
  @ApiParam({ name: 'id', description: 'Debt ID' })
  @ApiResponse({ status: 200, description: 'Debt deleted successfully' })
  remove(@Param('id') id: string) {
    return this.debtService.remove(id);
  }
}
