import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MenuDto {
  @ApiProperty({
    description: 'The name of the menu',
    example: 'System',
  })
  @IsString()
  name: string;
}
