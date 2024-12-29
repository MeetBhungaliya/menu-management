import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MenuDto } from './dto/menu.dto';
import { Menu } from './entities/menu.entity';
import { CreateMenu } from './entities/create-menu.entity';
import { MenuService } from './menu.service';
import { GetMenuDto } from './dto/get-menu.dto';
import { UpdateMenu } from './entities/update-menu.entity';

@ApiBearerAuth()
@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'GET MENU',
    description: 'Public endpoint to retrieve a menu based on menu_id.',
  })
  @ApiResponse({ status: 200, description: 'Created', type: Menu })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  getMenu(@Param('id') menu_id: string) {
    return this.menuService.get(menu_id);
  }

  @Post('create')
  @ApiOperation({
    summary: 'CREATE MENU',
    description: 'Endpoint to create a new menu item with a specified name.',
  })
  @ApiResponse({ status: 201, description: 'Created', type: CreateMenu })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  createMenu(@Body() createMenuDto: MenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'UPDATE MENU NAME',
    description:
      'Endpoint is used to update the name of an existing menu by its unique ID.',
  })
  @ApiResponse({ status: 200, description: 'Ok', type: UpdateMenu })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  updateById(@Param('id') id: string, @Body() createMenuDto: MenuDto) {
    return this.menuService.update(id, createMenuDto);
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
  removeById(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
