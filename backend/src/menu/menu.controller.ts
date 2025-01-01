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
import { CreateMenu } from './entities/create-menu.entity';
import { UpdateMenu } from './entities/update-menu.entity';
import { MenuService } from './menu.service';
import { GetMenu } from './entities/get-menu.entity';

@ApiBearerAuth()
@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({
    summary: 'GET ALL MENUS',
    description:
      'Private endpoint to list all Users. It is allowed only by "admin" users.',
  })
  @ApiResponse({ status: 200, description: 'Ok', type: GetMenu, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Server error' })
  findAll() {
    return this.menuService.findAll();
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
