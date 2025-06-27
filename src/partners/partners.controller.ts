import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { USER_ROLE } from '@prisma/client';
import { SelfGuard } from 'src/guards/self.guard';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) { }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new partner' })
  @ApiResponse({ status: 201, description: 'Partner successfully created' })
  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  create(@Body() createPartnerDto: CreatePartnerDto, @Req() req: Request) {
    return this.partnersService.create(createPartnerDto, req);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all partners with pagination and optional search' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search by fullname, phone, or address',
    example: 'Ali',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page (default: 10)', example: 10 })
  @ApiResponse({ status: 200, description: 'Paginated list of partners' })
  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  findAll(
    @Query('search') search?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    return this.partnersService.findAll(
      search,
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one partner by ID' })
  @ApiParam({ name: 'id', description: 'Partner ID' })
  @ApiResponse({ status: 200, description: 'Single partner returned' })
  @ApiResponse({ status: 404, description: 'Partner not found' })
  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a partner' })
  @ApiParam({ name: 'id', description: 'Partner ID' })
  @ApiResponse({ status: 200, description: 'Partner successfully updated' })
  @UseGuards(AuthGuard, SelfGuard)
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a partner' })
  @ApiParam({ name: 'id', description: 'Partner ID' })
  @ApiResponse({ status: 200, description: 'Partner successfully deleted' })
  @UseGuards(AuthGuard, SelfGuard)
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }
}
