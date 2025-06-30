import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UseGuards
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Roles } from 'src/decorators/roles.decorators'
import { AuthGuard } from 'src/guards/auth.guard'
import { RoleGuard } from 'src/guards/role.guard'
import { SelfGuard } from 'src/guards/self.guard'
import { USER_ROLE } from '@prisma/client'
import {
  ApiBearerAuth, ApiOperation, ApiResponse, ApiTags
} from '@nestjs/swagger'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBearerAuth()
  @Roles(USER_ROLE.OWNER, USER_ROLE.STAFF)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List categories' })
  @ApiResponse({ status: 200 })
  findAll() {
    return this.categoryService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, SelfGuard)
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, SelfGuard)
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id)
  }
}
