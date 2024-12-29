import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetMenuDto {
  @ApiProperty({
    description: 'The id of the menu',
    example: 'cm59ezbzh0005hwba3s9y87c0',
  })
  @IsString()
  menu_id: string;
}
