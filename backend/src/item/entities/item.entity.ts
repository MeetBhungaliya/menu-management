import { ApiProperty } from '@nestjs/swagger';

export class Item {
  @ApiProperty({
    description: 'User Id, generated by uuid',
    nullable: false,
    required: true,
    type: 'string',
    example: 'cm59k4tl200018ftyjf1qpa2t',
  })
  id: string;

  @ApiProperty({
    description: 'Name',
    nullable: false,
    required: true,
    type: 'string',
    example: 'Cheeseburger',
  })
  name: string;

  @ApiProperty({
    description: 'Updated At',
    nullable: true,
    required: false,
    type: 'number',
    example: 3354335,
  })
  depth?: number;
}
