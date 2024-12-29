import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  private readonly logger = new Logger('ItemService');

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateItemDto) {
    this.logger.log(`POST: item/create: Create item started`);

    try {
      const newuser = await this.prisma.item.create({
        data: dto,
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
