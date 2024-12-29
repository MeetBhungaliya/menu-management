import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    description: 'The name of the item',
    example: 'Cheeseburger',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The depth of the item in the menu hierarchy',
    example: 1,
  })
  @IsInt()
  depth: number;

  @ApiProperty({
    description: 'The parent ID of the item if any (null if no parent)',
    example: 'cuid123456789',
  })
  @IsString()
  parent_id: string;

  @ApiProperty({
    description: 'The ID of the menu to which the item belongs',
    example: 'cuid987654321',
  })
  @IsString()
  menu_id: string;
}
