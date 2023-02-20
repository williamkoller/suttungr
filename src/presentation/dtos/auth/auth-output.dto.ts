import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthOutputDTO {
  @IsString()
  @ApiProperty({
    example: 'YourAccessToken',
  })
  accessToken: string;
}
