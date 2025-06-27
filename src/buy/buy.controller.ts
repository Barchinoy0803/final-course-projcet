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
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { BuyService } from './buy.service';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { SelfGuard } from 'src/guards/self.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { USER_ROLE } from '@prisma/client';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Buys')
@ApiBearerAuth()
@Controller('buys')
export class BuyController {
  constructor(private readonly buyService: BuyService) { }

  @Post()
  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create a new purchase record' })
  @ApiResponse({ status: 201, description: 'Purchase created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(
    @Body() dto: CreateBuyDto,
    @Req() req: Request
  ) {
    return this.buyService.create(dto, req);
  }

  @Get()
  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Retrieve paginated list of purchases' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, example: 20, description: 'Items per page' })
  @ApiResponse({ status: 200, description: 'List of purchases retrieved' })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20
  ) {
    return this.buyService.findAll(+page, +limit);
  }

  @Get(':id')
  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Get a purchase by its ID' })
  @ApiParam({ name: 'id', description: 'Purchase ID', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @ApiResponse({ status: 200, description: 'Purchase found' })
  @ApiResponse({ status: 404, description: 'Purchase not found' })
  findOne(@Param('id') id: string) {
    return this.buyService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, SelfGuard)
  @ApiOperation({ summary: 'Update a purchase (self only)' })
  @ApiParam({ name: 'id', description: 'Purchase ID', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @ApiResponse({ status: 200, description: 'Purchase updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: not your own purchase' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBuyDto
  ) {
    return this.buyService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, SelfGuard)
  @ApiOperation({ summary: 'Delete a purchase (self only)' })
  @ApiParam({ name: 'id', description: 'Purchase ID', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @ApiResponse({ status: 200, description: 'Purchase deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: not your own purchase' })
  remove(@Param('id') id: string) {
    return this.buyService.remove(id);
  }
}
