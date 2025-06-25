import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(page = 1, limit = 10, search = '') {
    try {
      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      const [users, totalCount] = await Promise.all([
        this.prisma.user.findMany({
          where: {
            fullname: {
              contains: search,
              mode: 'insensitive',
            },
          },
          skip: (pageNumber - 1) * limitNumber,
          take: limitNumber,
        }),
        this.prisma.user.count({
          where: {
            fullname: {
              contains: search,
              mode: 'insensitive',
            },
          },
        }),
      ]);

      return {
        data: users,
        totalCount,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async findOne(id: string) {
    try {
      let user = await this.prisma.user.findUnique({ where: { id } })
      if (!user) return new NotFoundException("Not found")
      return user
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let updatedUser = await this.prisma.user.update({
        data: updateUserDto,
        where: { id }
      })
      return updatedUser
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      let removedUser = await this.prisma.user.delete({ where: { id } })
      return removedUser
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
