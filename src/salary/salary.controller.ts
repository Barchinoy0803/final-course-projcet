import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { USER_ROLE } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Salary')
@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) { }

  @Post()
  @ApiBearerAuth()
  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create a new salary record and update user balance' })
  @ApiResponse({ status: 201, description: 'Salary created' })
  create(@Body() createSalaryDto: CreateSalaryDto) {
    return this.salaryService.create(createSalaryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated salary records' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Paginated salary results' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.salaryService.findAll(page, limit);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a salary by ID' })
  @ApiResponse({ status: 200 })
  findOne(@Param('id') id: string) {
    return this.salaryService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(USER_ROLE.OWNER)
  @ApiOperation({ summary: 'Update a salary by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateSalaryDto) {
    return this.salaryService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(USER_ROLE.OWNER)
  @ApiOperation({ summary: 'Delete a salary by ID and decrease user balance' })
  remove(@Param('id') id: string) {
    return this.salaryService.remove(id);
  }
}
