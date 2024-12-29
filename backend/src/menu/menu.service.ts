import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { buildHierarchy } from 'src/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetMenuDto } from './dto/get-menu.dto';
import { MenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  private readonly logger = new Logger('MenuService');

  constructor(private prisma: PrismaService) {}

  async get(menu_id: string) {
    this.logger.log(`GET: menu/: Get menu started`);

    try {
      const menu = await this.prisma.menu.findFirst({
        where: { id: menu_id },
        select: {
          id: true,
          name: true,
        },
      });

      const item = await this.prisma.item.findMany({
        where: { menu_id, AND: { is_deleted: false } },
        select: {
          id: true,
          name: true,
          depth: true,
          menu_id: true,
          parent_id: true,
        },
      });

      return { ...menu, children: buildHierarchy(item) };
    } catch (error) {
      this.prismaErrorHanler(error, 'POST', menu_id);
      this.logger.error(`POST: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  async create(dto: MenuDto) {
    this.logger.log(`POST: menu/create: Create menu started`);

    try {
      const newuser = await this.prisma.menu.create({
        data: dto,
        select: {
          id: true,
          name: true,
        },
      });

      return newuser;
    } catch (error) {
      this.prismaErrorHanler(error, 'POST', dto.name);
      this.logger.error(`POST: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  async update(value: string, dto: MenuDto) {
    try {
      const updatedMenu = await this.prisma.menu.update({
        where: { id: value },
        data: dto,
        select: {
          id: true,
          name: true,
        },
      });
      return updatedMenu;
    } catch (error) {
      this.prismaErrorHanler(error, 'PATCH', value);
      this.logger.error(`PATCH: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  async remove(value: string) {
    try {
      const deletedMenu = await this.prisma.menu.delete({
        where: { id: value },
        select: {
          id: true,
          name: true,
        },
      });
      return deletedMenu;
    } catch (error) {
      this.prismaErrorHanler(error, 'DELETE', value);
      this.logger.error(`DELETE: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  prismaErrorHanler = (error: any, method: string, value: string = null) => {
    if (error.code === 'P2002') {
      this.logger.warn(`${method}: Menu already exists: ${value}`);
      throw new BadRequestException('Menu already exists');
    }
    if (error.code === 'P2025') {
      this.logger.warn(`${method}: Menu not found: ${value}`);
      throw new BadRequestException('Menu not found');
    }
  };
}
