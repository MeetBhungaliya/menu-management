import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { buildHierarchy } from 'src/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  private readonly logger = new Logger('ItemService');

  constructor(private prisma: PrismaService) {}

  async get(menu_id: string) {
    this.logger.log(`GET: menu/: Get menu started`);

    try {
      const { id, name, items } = await this.prisma.menu.findFirst({
        where: { id: menu_id },
        select: {
          id: true,
          name: true,
          items: {
            select: {
              id: true,
              name: true,
              depth: true,
              menu_id: true,
              parent_id: true,
            },
          },
        },
      });

      return {
        success: true,
        message: 'Items retrived successfully.',
        data: [
          {
            id,
            name,
            depth: null,
            menu_id: null,
            parent_id: null,
            children: buildHierarchy(items),
          },
        ],
      };
    } catch (error) {
      this.prismaErrorHanler(error, 'POST', menu_id);
      this.logger.error(`POST: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  async create(dto: CreateItemDto) {
    this.logger.log(`POST: item/create: Create item started`);

    let depth = null;

    if (dto.parent_id === dto.menu_id) depth = 1;
    else {
      try {
        const parent = await this.prisma.item.findFirstOrThrow({
          where: { id: dto.parent_id },
          select: {
            depth: true,
          },
        });

        depth = parent.depth + 1;
      } catch (error) {
        this.logger.error(`POST: error: ${error}`);
        throw new NotFoundException(
          `Data with Parent Id ${dto.parent_id} not found`
        );
      }
    }

    try {
      const newuser = await this.prisma.item.create({
        data: { ...dto, depth },
        select: {
          id: true,
          name: true,
          depth: true,
        },
      });

      return newuser;
    } catch (error) {
      this.prismaErrorHanler(error, 'POST', dto.name);
      this.logger.error(`POST: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  async update(value: string, dto: UpdateItemDto) {
    if (value === dto.parent_id) {
      throw new BadRequestException('Invalid parent id');
    }

    try {
      const item = await this.prisma.item.findFirstOrThrow({
        where: { id: value },
      });

      let depth = null;
      if (item.parent_id !== dto.parent_id) {
        if (dto.parent_id === dto.menu_id) {
          depth = 1;
        } else {
          const parentItem = await this.prisma.item.findFirstOrThrow({
            where: { id: dto.parent_id },
          });

          depth = parentItem.depth + 1;
        }
      } else {
        depth = item.depth;
      }

      const updatedItem = await this.prisma.item.update({
        where: { id: value },
        data: { ...dto, depth },
        select: {
          id: true,
          name: true,
          depth: true,
          parent_id: true,
          menu_id: true,
        },
      });

      return updatedItem;
    } catch (error) {
      this.prismaErrorHanler(error, 'PATCH', value);
      this.logger.error(`PATCH: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  async remove(value: string, response) {
    try {
      const itemIdsToDelete = await this.getRecursiveItemIds(value);

      if (itemIdsToDelete.length === 1 && itemIdsToDelete.includes(value)) {
        return response.status(HttpStatus.NOT_FOUND).send({
          success: false,
          message: `Children of Item id ${value} not found`,
        });
      }

      const deletedItems = await this.prisma.item.deleteMany({
        where: {
          id: {
            in: itemIdsToDelete,
          },
        },
      });

      return {
        success: true,
        message: 'Items deleted successfully.',
        data: deletedItems,
      };
    } catch (error) {
      this.prismaErrorHanler(error, 'PATCH', value);
      this.logger.error(`PATCH: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  private async getRecursiveItemIds(
    parentId: string,
    visited: Set<string> = new Set()
  ): Promise<string[]> {
    if (visited.has(parentId)) {
      return [];
    }

    visited.add(parentId);

    const children = await this.prisma.item.findMany({
      where: { parent_id: parentId },
      select: { id: true },
    });

    const uniqueIds = new Set<string>();
    uniqueIds.add(parentId);

    if (!children.length) {
      return Array.from(uniqueIds);
    } else {
      const childIds = children.map(child => child.id);

      for (const childId of childIds) {
        const grandChildIds = await this.getRecursiveItemIds(childId, visited);

        grandChildIds.forEach(id => uniqueIds.add(id));
      }

      return Array.from(uniqueIds);
    }
  }

  prismaErrorHanler = (error: any, method: string, value: string = null) => {
    if (error.code === 'P2002') {
      this.logger.warn(`${method}: Item already exists: ${value}`);
      throw new BadRequestException('Item already exists');
    }
    if (error.code === 'P2025') {
      this.logger.warn(`${method}: Item not found: ${value}`);
      throw new BadRequestException('Item not found');
    }
  };
}
