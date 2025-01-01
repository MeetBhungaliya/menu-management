import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { CreatItem } from './entities/create-item.entity';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'GET MENU',
    description: 'Public endpoint to retrieve a menu based on menu_id.',
  })
  @ApiResponse({ status: 200, description: 'Created', type: Item })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  getMenu(@Param('id') menu_id: string) {
    return this.itemService.get(menu_id);
  }

  @Post('create')
  @ApiOperation({
    summary: 'CREATE ITEM',
    description:
      'Add a new item to the menu, either as a main item or a sub-item.',
  })
  @ApiResponse({ status: 201, description: 'Created', type: CreatItem })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'UPDATE MENU NAME',
    description:
      'Endpoint is used to update the name of an existing menu by its unique ID.',
  })
  @ApiResponse({ status: 200, description: 'Ok', type: CreatItem })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  updateById(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'DELETE MENU',
    description:
      'Endpoint is used to delete the name of an existing menu by its unique ID.',
  })
  @ApiOkResponse({
    content: { 'application/json': { example: { message: 'Menu deleted' } } },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  removeById(@Param('id') id: string, @Res() response) {
    return this.itemService.remove(id, response);
  }
}
