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
import { MenuService } from './menu.service';
import { GetMenuDto } from './dto/get-menu.dto';

@ApiBearerAuth()
@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({
    summary: 'GET MENU',
    description: 'Public endpoint to Create a new Menu.',
  })
  @ApiResponse({ status: 201, description: 'Created', type: Menu })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  getMenu(@Body() getMenuItemDto: GetMenuDto) {
    return this.menuService.get(getMenuItemDto);
  }

  @Post('create')
  @ApiOperation({
    summary: 'CREATE MENU',
    description: 'Public endpoint to Create a new Menu.',
  })
  @ApiResponse({ status: 201, description: 'Created', type: Menu })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  createMenu(@Body() createMenuDto: MenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'UPDATE USER BY EMAIL',
    description:
      'Private endpoint to update user data by email. <ul><li>The "user" role is permitted to update only their own information.</li><li>The "admin" role has the privilege to update information of any user</li><li>Only the "admin" role can update the "role" field</li></ul>',
  })
  @ApiResponse({ status: 200, description: 'Ok', type: Menu })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  updateById(@Param('id') id: string, @Body() createMenuDto: MenuDto) {
    return this.menuService.update(id, createMenuDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'DELETE USER BY ID',
    description:
      'Private endpoint to delete user by Id. <ul><li>The "user" role is permitted to remove only their own information.</li><li>The "admin" role has the privilege to delete any user</li></ul>',
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
