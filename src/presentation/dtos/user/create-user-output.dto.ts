import { ApiProperty } from '@nestjs/swagger';

export class CreateUserOutputDTO {
  @ApiProperty({
    example: 2,
  })
  id: number;

  @ApiProperty({
    example: 'William',
  })
  name: string;

  @ApiProperty({
    example: 'Koller',
  })
  surname: string;

  @ApiProperty({
    example: true,
  })
  active: boolean;

  @ApiProperty({
    example: 'william@mail.com',
  })
  email: string;

  @ApiProperty({
    example: '$2b$10$YhJUdhI5knhqZVL7tIWd4OWwUKpCuySkO6lEmuQvLQvZ/XG3rwWd2',
  })
  password: string;

  @ApiProperty({
    example: '2023-02-01T15:00:47.117Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-02-01T15:00:47.117Z',
  })
  updatedAt: Date;
}
