import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class Item {
  @ApiProperty({
    description: 'User Id, generated by uuid',
    nullable: false,
    required: true,
    type: 'string',
    example: '2313w49-0db7-4v79-aacc-52624343bf2t',
  })
  id: string;

  @ApiProperty({
    description: 'Name',
    nullable: false,
    required: true,
    type: 'string',
    example: 'John Sample',
  })
  name: string;

  @ApiProperty({
    description: 'Email',
    uniqueItems: true,
    nullable: false,
    required: true,
    type: 'string',
    example: 'youremail@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Email Verified',
    nullable: true,
    required: false,
    type: 'string',
    example: '2022-01-01T00:00:00.000Z',
  })
  emailVerified?: string;

  @ApiProperty({
    description: 'User Role (admin, user)',
    nullable: false,
    required: true,
    type: 'string',
    example: 'user',
  })
  role: Role;

  @ApiProperty({
    description: 'Image URL',
    nullable: true,
    required: false,
    type: 'string',
    example: 'https://picsum.photos/200',
  })
  image?: string;

  @ApiProperty({
    description: 'Created At',
    nullable: true,
    required: false,
    type: 'string',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Updated At',
    nullable: true,
    required: false,
    type: 'string',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt?: Date;
}
