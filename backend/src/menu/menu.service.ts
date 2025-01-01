import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  private readonly logger = new Logger('MenuService');

  constructor(private prisma: PrismaService) {}

  async findAll() {
    this.logger.log(`GET: menu/get: Get all menu`);

    try {
      const menus = await this.prisma.menu.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      return menus;
    } catch (error) {
      this.prismaErrorHanler(error, 'GET');
      this.logger.error(`GET: error: ${error}`);
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
      const deletedItems = await this.prisma.item.deleteMany({
        where: { menu_id: value },
      });

      const deletedMenu = await this.prisma.menu.delete({
        where: { id: value },
        select: {
          id: true,
          name: true,
        },
      });
      return { ...deletedMenu, items: deletedItems };
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
